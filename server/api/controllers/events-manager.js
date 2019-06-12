function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function checkChoice(context, event) {
    for (let i = 0; i < event.choices.length; i++) {
        console.log(i);
        if (neededConditions(context, event.choices[i].conditions) == false) {
            event.choices.splice(i, 1);
        }
    }
    return event;
}

function getRandomEvent(game) {
    if (game.available_events.length > 0) {
        let event = game.events[game.available_events[getRandomInt(game.available_events.length)]];
        event = checkChoice(game.context, event);
        return event;
    }
    return {}
}

function getTypeOfCategory(category, subCategory) {
    if ((category == 1 && (subCategory == "reputation" || subCategory == "honnor" || subCategory == "fear" || subCategory == "military_force")) ||
        (category == 2 && subCategory == "level_relation") || (category == 3 && subCategory == "defense"))
        return 1; // category limited between 0 and 100 (e.g. level of relationship with another character)
    else if (subCategory == "status")
        return 2; // category in status (e.g. status of player)
    else
        return 3; // other (e.g. money)
}

function modifyField(category, subCategory, field, result) {
    const type = getTypeOfCategory(category, subCategory);

    if (type != 2) // if the category is not a status to change
        field += result;
    else
        field = result;
    if (type == 1) { // if the category has to be between 0 and 100
        field = field >= 0 ? field : 0; // if the category is less than 0, set at 0
        field = field <= 100 ? field : 100; // if the category is more than 100, set at 100
    }
    return field;
}

function modifyContextPlayer(game, results) {
    for (let subCategory in results["player"]) {
        game.context["player"][subCategory] = modifyField(1, subCategory, game.context["player"][subCategory], results["player"][subCategory]);
        if (subCategory == "honnor")
            game.context["player"]["fear"] = 100 - game.context["player"]["honnor"];
        else if (subCategory == "fear")
            game.context["player"]["honnor"] = 100 - game.context["player"]["fear"];
    }
    return game;
}

function modifyContextOther(game, category, results) {
    for (let item in results[category]) {
        for (let subCategory in results[category][item]) {
            game.context[category][item][subCategory] = modifyField(category, subCategory, game.context[category][item][subCategory], results[category][item][subCategory]);
        }
    }
    return game;
}

function conditionPlayer(context, conditions) {
    for (let subCategory in conditions["player"]) {
        if (subCategory != "status" && context["player"][subCategory] < conditions["player"][subCategory]) {
            return false
        }
        else if (subCategory == "status" && context["player"][subCategory] != conditions["player"][subCategory])
            return false;
    }
    return true; 
}

function conditionOther(context, conditions, category) {
    for (let item in conditions[category]) {
        for (let subCategory in conditions[category][item]) {
            if (subCategory != "status" && context[category][item][subCategory] < conditions[category][item][subCategory])
                return false
            else if (subCategory == "status" && context[category][item][subCategory] != conditions[category][item][subCategory])
                return false;
        }
    }
    return true;
}

function neededConditions(context, conditions) {
    let result = true;

    for (let category in conditions) {
        if (result == true && category == "player")
            result = conditionPlayer(context, conditions);
        else if (result == true)
            result = conditionOther(context, conditions, category);
    }
    return result;
}

function defineAvaibleEvent(game, idEvent, idChoice) {
    let availableEvents = [];

    if (game.events[idEvent].next.length > 0) {
        availableEvents.push(game.events[idEvent].next[idChoice]);
    } else {
        for (let i = 0; i < game.events.length; i++) {
            if (game.events[i].is_done == false && game.events[i].initial_event == true) {
                if (neededConditions(game.context, game.events[i].conditions) == true) {
                    availableEvents.push(i);
                }
            }
        }
    }
    return availableEvents;
}

function modifyContext(game, idEvent, idChoice) {
    const results = game.events[idEvent].choices[idChoice].results;
    game.events[idEvent].is_done = true;
    for (let category in results) {
        if (category == "player")
            game = modifyContextPlayer(game, results);
        else
            game = modifyContextOther(game, category, results);
    }
    game.available_events = defineAvaibleEvent(game, idEvent, idChoice)
    return game;
}

module.exports = {
    getRandomEvent: getRandomEvent,
    modifyContext: modifyContext
}