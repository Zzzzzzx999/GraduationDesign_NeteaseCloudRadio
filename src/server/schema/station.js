const joi = require('joi')

// 定义 name 和 alias 的验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()
const cover_image = joi.string().required()
const title = joi.string().required()
const content = joi.string().required()
const pub_date = joi.required()
const cateName = joi.string().required()
const author = joi.string().required()
// 定义 id 的验证规则
const id = joi.number().integer().min(1).required()


exports.add_cate_schema = {
    body:{
        name,
        alias
    }
}



exports.get_cate_schema = {
    params:{
        id
    }
}

exports.update_cate_schema={
    body:{
        id,
        name,
        alias,
    }
}


exports.add_station_schema={
    body:{
        cover_image,
        title,
        content,
        pub_date,
        id,
        cateName,
        author,
    }
}

exports.update_station_schema={
    body:{
        cover_image,
        title,
        content,
        pub_date,
        id,
        cateName,
        author,
    }
}
