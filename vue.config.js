const fs = require('fs');
/**
 * @param {*当前的数量} pageSize
 * @param {*当前页} currentPage
 * @param {*当前数组} arr
 */
function pagination(pageSize,currentPage,arr){
    let skipNum = (currentPage-1) * pageSize;
    let newArr = (skipNum + pageSize >= arr.length) ? arr.slice(skipNum,arr.length) : arr.slice(skipNum,skipNum+pageSize);
    return newArr;
}
// 升序还是降序
/**
 * @param {*排序的属性} attr
 * @param {*true表示升序排序 false表示降序排序} rev
 */
function sortBy(attr,rev) {
    if(rev===undefined){
        rev = 1;
    }else{
        rev = rev ? 1 : -1;
    }
    return function(a,b){
        a = a[attr];
        b = b[attr];
        if(a<b){
            return rev * -1;
        }
        if(a>b){
            return rev * 1;
        }
        return 0;
    }
}
function range(arr,gt,lte){
    return arr.filter(item => item.salePrice >=gt && item.salePrice<=lte);
}
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cartListJSON = require('./db/cartList.json');
module.exports = {
    devServer:{
        before(app,serve){
            app.use(cors());
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({extended:false}));
            app.get('/api/goods/home',(req,res)=>{
                fs.readFile('./db/home.json','utf8',(err,data)=>{
                    if(!err){
                        res.json(JSON.parse(data));
                    }
                })
            })
            app.get('/api/goods/allGoods',(req,res)=>{
                //获取请求参数的值
                const page = parseInt(req.query.page);
                const size = parseInt(req.query.size);
                const sort = parseInt(req.query.sort);
                const gt = parseInt(req.query.priceGt);
                const lte = parseInt(req.query.priceLte);
                const cid = req.query.cid;
                let newData = []
                fs.readFile('./db/allGoods.json','utf8',(err,data)=>{
                    let {result} = JSON.parse(data);
                    let allData = result.data;
                    //分页显示
                    // newData = pagination(size,page,allData);
                    if(cid==='1184'){
                        newData = allData.filter(item=>item.productName.match(RegExp(/Smartisan/)))
                        if(sort===1){ //价格由低到高
                            allData = allData.sort(sortBy('salePrice',true));   
                        }else if(sort === -1){ //价格由高到低
                            allData = allData.sort(sortBy('salePrice',false));
                        }
                        newData = pagination(size,page,newData);
                    }else{
                        if(sort===1){ //价格由低到高
                            allData = allData.sort(sortBy('salePrice',true));     
                        }else if(sort === -1){ //价格由高到低
                            allData = allData.sort(sortBy('salePrice',false));
                        }
                        if(gt && lte){
                            allData = range(allData,gt,lte);
                        }
                        newData = pagination(size,page,allData);
                    }
                    if(newData.length < size){
                        res.json({
                            data:newData,
                            total:newData.length
                        });
                    }else{
                        res.json({
                            data:newData,
                            total:allData.length
                        })
                    }
                })
            })
            //商品详情
            app.get('/api/goods/productDet',(req,res)=>{
                const productId = parseInt(req.query.productId);
                // console.log(productId);
                fs.readFile('./db/goodsDetail.json','utf8',(err,data)=>{
                    if(!err){
                        let {result} = JSON.parse(data);
                        let newData = result.find(item=>item.productId===productId);
                        // console.log(newData);    
                        res.json(newData);
                    }
                })
            })

            //模拟一个登陆的接口
            app.post('/api/login',(req,res)=>{
                // console.log(req.body.user);
                
                //登录成功获取用户名
                let username = req.body.user;
                //一系列操作
                res.json({
                    //进行加密的方法
                    //sign 参数1：加密的对象 参数2：加密的规则 参数3：过期时间
                    token:jwt.sign({username:username},'abcd',{expiresIn:"3000s"}),
                    username,
                    state:1,
                    file:'/static/images/1570600179870.png',
                    code:200,
                    address:null,
                    balance:null,
                    description:null,
                    email:null,
                    message:null,
                    phone:null,
                    points:null,
                    sex:null,
                    id:62
                });
            })
            //添加购物车
            app.post('/api/addCart',(req,res) => {
                let { userId,productId,productNum } = req.body;
                fs.readFile('./db/allGoods.json',(err,data) => {
                    let {result} = JSON.parse(data);
                    if(productId && userId) {
                        //找到对应的用户
                        let {cartList} = cartListJSON.result.find(item => item.id===parseInt(userId));
                        //找到对应的商品
                        let newData = result.data.find(item => item.productId===parseInt(productId));
                        // console.log(newData);
                        newData.limitNum = 100;
                        
                        let flag = true;
                        if(cartList && cartList.length){
                            cartList.forEach(item => {
                                if(item.productId===productId){
                                    if(item.productNum >= 1){
                                        flag = false;
                                        item.productNum +=parseInt(productNum);
                                    }
                                }
                            });
                        }
                        if(!cartList.length || flag){
                            newData.productNum = parseInt(productNum);
                            cartList.push(newData);
                        }
                        //序列化
                        fs.writeFile('./db/cartList.json',JSON.stringify(cartListJSON),(err)=>{
                            if(!err){
                                res.json({
                                    code:200,
                                    message:'success',
                                    result:1,
                                    success:true,
                                    timestamp:1571296313981
                                });
                            }
                        });
                    }
                })
            })
            //根据用户Id读取购物车数据
            app.post('/api/cartList',(req,res) => {
                let { userId } = req.body;
                fs.readFile('./db/cartList.json',(err,data) => {
                    let { result } = JSON.parse(data);
                    let newData = result.find(item => item.id==userId);
                    res.json({
                        code:200,
                        cartList:newData,
                        success:true,
                        message:'success'
                    });
                })
            })
            //登录持久化验证接口，访问这个接口的时候，一定要访问token
            //先访问登录接口，得到token，再访问这个，看是否成功
            app.post('/api/validate',(req,res)=>{
                const token = req.headers.authorization;
                // console.log(token);
                //验证token的合法性，对token进行解码
                jwt.verify(token,'abcd',(err,decode)=>{
                    if(err){
                        res.json({
                            msg:'当前用户未登录'
                        });
                    }else{
                        //证明用户已经登录
                        res.json({
                            token:jwt.sign({username:decode.username},'abcd',{expiresIn:"3000s"}),
                            username:decode.username,
                            msg:'已登录',
                            file:'/static/images/1570600179870.png',
                            address:null,
                            balance:null,
                            description:null,
                            email:null,
                            message:null,
                            phone:null,
                            points:null,
                            sex:null,
                            id:62,
                            state:1
                        });
                    }
                });
            });
        }
    }
}