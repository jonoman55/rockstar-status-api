function parseData(data, type) {
    switch (type) {
        case 'services':
            return {
                id: data?.id,
                name: data?.name,
                message: formatMessage(data?.message),
                updated: data?.updated,
                status: data?.status_tag
            };
        case 'statuses':
            return {
                id: data?.id,
                name: data?.name,
                message: formatMessage(data?.message),
                updated: data?.updated,
                status: data?.status_tag,
                services_platforms: parsePlatforms(data?.services_platforms),
            };
        default:
            return data;
    };
};

function formatMessage(message) {
    return message.replace(/<\/?[^>]+>/gi, '').trim();
};

function parsePlatforms(platform) {
    return platform.map((p) => {
        return {
            id: p?.id,
            name: p?.name,
            status: p?.service_status?.status
        };
    });
};

module.exports = parseData;