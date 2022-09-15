import { faker } from '@faker-js/faker';

function itemFactory(){

    return {
        title: faker.lorem.words(),
        url: faker.internet.url(),
        description: faker.lorem.paragraph(),
        amount: faker.datatype.number(200)
    }

}

export default itemFactory;