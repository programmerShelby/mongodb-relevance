const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/mongo-relation')


const CategorySchema = new mongoose.Schema({
    name : {type : String}
},{
    toJSON : {virtuals : true}//当调用json字段时使用 
})

// virtual添加虚拟
CategorySchema.virtual('posts',{
    //来源
    ref : 'Post',
    //本模型中字段
    localField : '_id',
    //关联模型字段
    foreignField : 'categories',
    justOne : false,
})

const Category = mongoose.model('Category',CategorySchema)

//模型参数有俩 第一个参数为模型名称 第二个为模型结构
const Post = mongoose.model('Post', new mongoose.Schema({
    title : { type : String },
    body : { type : String },
    //ref : 'Category'  关联对象
    category : { type : mongoose.SchemaTypes.ObjectId,ref : 'Category' },
    categories : [{ type : mongoose.SchemaTypes.ObjectId,ref : 'Category' }],
}))

async function main(){

    const cats = await Category.find().populate('posts').lean()//lean() 表示输出存粹的JSON数据

    //console.log(cats[0].posts);//因为之前定义过 虚拟 posts 所以可以反向查看
    console.log(cats)


    /* await Post.insertMany([
        {title : 'postlover1' , body : 'jw'},
        {title : 'postlover2' , body : 'hby'},
    ]) */
    /* await Category.insertMany([
        { name : 'nodejs'},
        { name : 'vuejs'}
    ]) */
    /* const posts = await Post.find()
    const cars = await Category.find()
    console.log(cars);
    console.log(posts); */
    /* const cat1 = await Category.findOne({name : 'nodejs'})
    const cat2 = await Category.findOne({name : 'vuejs'}) */
    /* const post1 = await Post.findOne({title : 'postlover1'})
    const post2 = await Post.findOne({title : 'postlover2'})
    post1.categories = [cat1,cat2]
    post2.categories = [cat2]
    await post1.save()
    await post2.save() */
    //通过post 查分类列表
        //populate() 对分类进行展示
    /* const posts = await Post.find().populate('categories')
    console.log(posts[0],posts[1]); */
}

main()