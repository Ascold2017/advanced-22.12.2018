export function getSkills({ url, method, data, headers = {}, params, ...args}) {
    console.group('Get Skills')

    console.log('Url: ', url)
    console.log('Method: ', method)
    console.log('Data: ', data)
    console.log('Params: ', params)
    console.log('Args: ', args)
    console.groupEnd()
    return Promise.resolve([
        {
            "id":1,
            "title":"Test 1",
            "percents":50,
            "category":1,
            "user_id":58,
            "created_at":"2018-12-12 13:20:03",
            "updated_at":"2018-12-12 13:51:37"
        },
        {
            "id":2,
            "title":"Test 2",
            "percents":33,
            "category":2,
            "user_id":58,
            "created_at":"2018-12-12 14:22:50",
            "updated_at":"2018-12-12 14:22:50"
        },
        {
            "id":3,
            "title":"Test 3",
            "percents":33,
            "category":3,
            "user_id":58,
            "created_at":"2018-12-12 14:22:50",
            "updated_at":"2018-12-12 14:22:50"
        },
        {
            "id":4,
            "title":"Test 4",
            "percents":33,
            "category":2,
            "user_id":58,
            "created_at":"2018-12-12 14:22:50",
            "updated_at":"2018-12-12 14:22:50"
        },
        {
            "id":5,
            "title":"Test 5",
            "percents":33,
            "category":3,
            "user_id":58,
            "created_at":"2018-12-12 14:22:50",
            "updated_at":"2018-12-12 14:22:50"
        }
    ])
}

export function createSkill({ url, method, data, headers = {}, params, ...args}) {
    const responseValue = {
        ...data,
        "user_id": 58,
        "created_at":"2018-12-12 13:20:03",
        "updated_at":"2018-12-12 13:51:37",
        "id": Math.random() * 1000 + 5
    }
    console.group('Create Skill')

    console.log('Url: ', url)
    console.log('Method: ', method)
    console.log('Data: ', data)
    console.log('Params: ', params)
    console.log('Args: ', args)
    console.log('Response value: ', responseValue)
    console.groupEnd()

    return Promise.resolve(responseValue)
}