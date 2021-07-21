export class VaesenActor extends Actor {

    prepareData(){
        super.prepareData();
        const actorData = this.data;

        this.data.exp = actorData.data.experience;
		
		
    }


    static async create(data, options={}) {
        data.token = data.token || {};
        mergeObject(data.token, {
            vision: true,
            dimSight: 30,
            brightSight: 30,
            actorLink: true,
            disposition: 1
        }, {overwrite: false});
        return super.create(data, options);
    }
}
