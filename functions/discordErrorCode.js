const { RESTJSONErrorCodes: ErrorCodes } = require(`discord-api-types/v10`);

module.exports = (err, res, returnPath) => {
    const errorViewDir = `${process.cwd()}/views/errors/discord`
    switch (err.code) {
        case ErrorCodes.UnknownAccount:
            res.render(`${errorViewDir}/10001.pug`, {
                title: `10001 - Unknown Account`,
                returnToPath: returnPath
            });
            break;
        case ErrorCodes.UnknownChannel:
            res.render(`${errorViewDir}/10003.pug`, {
                title: `10003 - Unknown Channel`,
                returnToPath: returnPath
            });
            break;
        case ErrorCodes.UnknownGuild:
            res.render(`${errorViewDir}/10004.pug`, {
                title: `10004 - Unknown Guild`,
                returnToPath: returnPath
            });
            break;
        case ErrorCodes.UnknownMember:
            res.render(`${errorViewDir}/10007.pug`, {
                title: `10007 - Unknown Member`,
                returnToPath: returnPath
            });
            break;
        case ErrorCodes.UnknownMessage:
            res.render(`${errorViewDir}/10008.pug`, {
                title: `10008 - Unknown Message`,
                returnToPath: returnPath
            });
            break;
        case ErrorCodes.UnknownToken:
        case ErrorCodes.InvalidToken:
            res.render(`${errorViewDir}/40001.pug`, {
                title: `40001 - Invalid Token`,
                returnToPath: returnPath
            });
            break;
        case ErrorCodes.MissingAccess:
            res.render(`${errorViewDir}/50001.pug`, {
                title: `50001 - Missing Access`,
                returnToPath: returnPath
            });
            break;
        case ErrorCodes.CannotSendMessagesToThisUser:
            res.render(`${errorViewDir}/50007.pug`, {
                title: `50007 - Cannot Send Messages To This User`,
                returnToPath: returnPath
            });
            break;
        case ErrorCodes.MissingPermissions:
            res.render(`${errorViewDir}/50013.pug`, {
                title: `50013 - Missing Permissions`,
                returnToPath: returnPath
            });
            break;
        case ErrorCodes.InvalidRecipients:
            res.render(`${errorViewDir}/50033.pug`, {
                title: `50033 - Invalid Recipients`,
                returnToPath: returnPath
            });
            break;
        case ErrorCodes.InvalidFormBody:
            res.render(`${errorViewDir}/50035.pug`, {
                title: `50035 - Invalid Form Body`,
                returnToPath: returnPath
            });
            break;
        case ErrorCodes.GeneralError:
        default:
            case ErrorCodes.GeneralError:
            if (err.status === 401 || err.status === 403) {
                res.render(
                    `${errorViewDir}/../401.pug`,
                    {
                        title: `${err.status} - Forbidden`,
                        code: err.status.toString(),
                        returnToPath: returnPath
                    }
                );
            } else {
                res.render(
                    `${errorViewDir}/../501.pug`,
                    {
                        title: `501 - Internal Server Error`,
                        returnToPath: returnPath
                    }
                );
            }
            break;
    }
}