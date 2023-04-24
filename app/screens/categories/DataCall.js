export class DataCall {
    // Just simulating incremental loading, don't infer anything from here
    static async get(start, count) {
        const responseHusky = await fetch('http://b2b.trivenilabs.com/api/v1/category/?parent=10');
        const responseBeagle = await fetch(
            'http://b2b.trivenilabs.com/api/v1/category/?parent=10'
        );

        const responseJsonHusky = await responseHusky.json();
        const responseJsonBeagle = await responseBeagle.json();

        const fullData = responseJsonHusky.concat(
            responseJsonBeagle
        );

        const filteredData = fullData.slice(
            start,
            Math.min(fullData.length, start + count)
        );
        return filteredData;
    }
}
