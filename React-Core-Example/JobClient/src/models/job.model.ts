// job model
// example: { "id": "00001111222233334444555577770001", "CreateDate": "2019-05-04T12:00:00.000Z", "description": "Job01", "active": true },
export class Job {
    id: string;
    title: string;
    company: string;
    createDate: string;
    postedDate: string;
    description: string | undefined;
    active: boolean;
    location: string | undefined;
    status: string | undefined;

    constructor(
        id: string,
        title: string,
        company: string,
        createDate: Date,
        postedDate: Date,
        active: boolean,
        description: string | undefined = undefined
    ) {
        
        this.id = id; // guid
        this.title = title;
        this.company = company;
        this.createDate = createDate.toLocaleDateString();
        this.postedDate = postedDate.toLocaleDateString();
        this.active = active;
        this.description = description ?? 'Job-' + id;
        this.status = active ? 'active' : 'inactive';
    }
}
