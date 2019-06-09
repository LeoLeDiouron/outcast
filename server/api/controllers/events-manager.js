function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomEvent(game) {
    if (game.available_events.length > 0)
        return game.events[game.available_events[getRandomInt(game.available_events.length)]-1];
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
    for (let subCategory in results[1])
        game.context[1][subCategory] = modifyField(1, subCategory, game.context[1][subCategory], results[1][subCategory]);
    return game;
}

function modifyContextOther(game, category, results) {
    for (let item in results[category]) {
        for (let subCategory in results[category][item]) {
            game.context[category][item-1][subCategory] = modifyField(category, subCategory, game.context[category][item-1][subCategory], results[category][item][subCategory]);
        }
    }
    return game;
}

function modifyContext(game, idEvent, idChoice) {
    const results = game.events[idEvent-1].choices[idChoice-1].results;
    game.events[idEvent-1].is_done = true;
    for (let category in results) {
        if (category == 1)
            game = modifyContextPlayer(game, results);
        else
            game = modifyContextOther(game, category, results);
    }
    return game;
}

module.exports = {
    getRandomEvent: getRandomEvent,
    modifyContext: modifyContext
}