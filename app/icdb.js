'use strict';
const querystring = require('querystring');
var QRCode = require('qrcode');
const nodemailer = require("nodemailer");

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	async = require('async'),
	uid = require('uid'),
	fs = require('fs'),
	request = require('request'),
	helperCTRL = require('./helper');
	require('date-utils');

var filePath = {
	1: __dirname + '/../../public/assets/uploads/users/'
};


function sendProductVerification(result){
    async function main(){
  
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: 'jeptags@gmail.com', 
		  pass: 'Tvn@1970@1971' 
		  

        }
      });
  
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Best Sky America" <jeptags@gmail.com>', // sender address
        to: "jeptags@gmail.com", // list of receivers
        subject: "Product Activation! ✔", // Subject line
        html: `<h1>Hello  </h1><p> This product ${result.name} need to be activated<br>
    
    	 Have a nice day !        `
      });
      
    }
  
    main().catch(console.error);
  
  }


/**
 *
 */
exports.getSingle = function(req, res) {

	if (!req.body.model || !req.body._id) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.findById(req.body._id, function(err, result) {

		res.json(result);
		console.log(result)
	});
};

exports.getstorelistByID = function(req, res) {

	if (!req.body.model || !req.body.condition) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.find({"seller_id":req.body.condition}, function(err, result) {

		res.json(result);
		console.log(result)
	});
};

exports.getProductslistByID = function(req, res) {
console.log("model"+req.body.model+" selller id "+req.body.condition);
	if (!req.body.model || !req.body.condition) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.find({"seller_id":req.body.condition}, function(err, result) {

		res.json(result);
		console.log(result)
	});
};
exports.getProductslistByIDWeb = function(req, res) {
	console.log("model"+req.body.model+" selller id "+req.body.condition);
		if (!req.body.model || !req.body.condition) {
			res.json([]);
			return;
		}
	
		var commonModel = mongoose.model(req.body.model);
	
		commonModel.find({"store_id":req.body.condition}, function(err, result) {
	
			res.json(result);
			console.log(result)
		});
	};
exports.getSingleData = function(req, res) {

	if (!req.body.model || !req.body._id) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.findById(req.body._id, function(err, result) {
		console.log("store  result"+result)

		return res.json({
			status:true,
			result:result
		});
	});
};

exports.addTagsListd = function(req, res) {
	console.log("request data"+ req.body.myarray+"body "+req.body);	
	console.log("taglist saving");	
	var commonModel = mongoose.model("Tags");
	var array=[];
	array=req.body.myarray;
	
	console.log("ARRAY IS: "+array[10])
	for ( var i in array){
		//console.log("array in loop "+JSONData[i]+"tag type:"+JSONData.tag_type+" id"+JSONData.tag_id)
		var taglist=new commonModel({
			TagType:array[i].tag_type,
			TagID: array[i].tag_id,
			SellerID:array[i].seller_id,
			JeptagID:array[i].jeptag_id
		})
		// console.log("taglist obj"+taglist + "seller id "+taglist.SellerID)
		taglist.save();
		// taglist.save(function(err) {
		// 	if (err){
		// 		console.log("error");
		// 			res.json({
		// 			status:false
		// 		});		
		// 		return;
		// 	}
		// 	else{
				
				return res.json({
					status:true
				});
				
		// 	}
		// });
	}


	// req.body.myarray.forEach(function (arrayobj) {

	// 	var taglist=new commonModel({
	// 		TagType:arrayobj.TagType,
	// 		TagID: arrayobj.TagID,
	// 		SellerID:arrayobj.SellerID,
	// 		JeptagID:arrayobj.JeptagID

	// 	})
	// 	taglist.save(function(err, result) {
	// 		if (err){
	// 			console.log("error");
	// 				res.json({
	// 				status:false
	// 			});		
	// 			return;
	// 		}
	// 		else{
				
	// 			res.json({
	// 				status:true
	// 			});
	// 			return;
	// 		}
	// 	});
	
	// });
	console.log("tag items saved succesfully");
}
exports.addTagsList = function(req, res) {
		console.log("request data"+ req.body.myarray   +"TYPE OF "+typeof(req.body.myarray));	
		console.log("taglist saving");	
		var commonModel = mongoose.model("Tags");
		var counttag=0;
		var countsavetag=0;	
		var countrecieved=0;
		var JSONData;		
		var JSONData =JSON.parse(req.body.myarray);	
	


		JSONData.forEach (function(item){
			countrecieved++;
			console.log("Count of tag recieved"+countrecieved);
			console.log("TAGGGGGG IDDD :"+item.tag_id)
			commonModel.findOne({TagID:item.tag_id},function(err,result){
			
				if(!result){
					var taglist=new commonModel({
						TagType:item.tag_type,
						TagID: item.tag_id,
						SellerID:item.seller_id,
						createdAt:new Date().getTime(),
						JeptagID:item.jeptag_id
			
					})
					console.log("taglist obj"+taglist)
					taglist.save();
					countsavetag++;
					console.log("Count of tag saved"+countsavetag);
				}
				else{
					console.log("Tag ALREDAY PRESENT")
					counttag++;
					console.log("count of tag duplicated"+counttag);


				}

			});
			//console.log("array in loop "+JSONData[i]+"tag type:"+JSONData.tag_type+" id"+JSONData.tag_id)
			
		});
			

	
			 return res.json({
							status:true
						});
			
	
	
	
	}


	exports.addTagsListT = function(req, res) {
		console.log("request data"+ req.body.myarray   +"TYPE OF "+typeof(req.body.myarray));	
		console.log("taglist saving");	
		var commonModel = mongoose.model("Tags");
		//console.log(req.body.myarray);

		//var array=[]
		var array=req.body.myarray;

		 var JSONData;
		 //JSONData=array;
		// JSONData = array.replace('[','').replace(']','').split(',').map(x => x.trim());
				var JSONData =JSON.parse(req.body.myarray);	
		console.log("array of tags "+JSONData + "FIRTS OF JSON DAATA"+JSONData[1]);
		//var array =JSON.parse(req.body.myarray);
		//JSON.parse(response.body.myarray(/\/g,''));
		// jsonObj=JSON.parse(req.body.myarray);
		//var jsonObject = stringToObject(req.body.myarray)
		//console.log("conveted data"+json);
		// req.body.createdAt = new Date().getTime();


		// for (var j =0 ;j<JSONData.length;j++){
		// 	console.log ("new array "+JSONData[j]+"array tag id :"+JSONData[j].tag_id)
		// }

		for ( var i in JSONData){
		
			//console.log("array in loop "+JSONData[i]+"tag type:"+JSONData.tag_type+" id"+JSONData.tag_id)
			var taglist=new commonModel({
				TagType:JSONData[i].tag_type,
				TagID: JSONData[i].tag_id,
				//SellerID:JSONData[i].seller_id,
				JeptagID:JSONData[i].jeptag_id
	
			})
			console.log("taglist obj"+taglist)
			taglist.save();
		}
			 return res.json({
							status:true
						});
						
			// taglist.save(function(err,DATA) {
			// 	if (err){
			// 		console.log("error");
			// 			res.json({
			// 			status:false
			// 		});		
			// 		return;
			// 	}
			// 	else{
					
			// 		res.json({
			// 			status:true
			// 		});
			// 		return;
			// 	}
			// });
		
	
	
		// req.body.myarray.forEach(function (arrayobj) {

		// 	var taglist=new commonModel({
		// 		TagType:arrayobj.TagType,
		// 		TagID: arrayobj.TagID,
		// 		SellerID:arrayobj.SellerID,
		// 		JeptagID:arrayobj.JeptagID
	
		// 	})
		// 	taglist.save(function(err, result) {
		// 		if (err){
		// 			console.log("error");
		// 				res.json({
		// 				status:false
		// 			});		
		// 			return;
		// 		}
		// 		else{
					
		// 			res.json({
		// 				status:true
		// 			});
		// 			return;
		// 		}
		// 	});
		
		// });
		console.log("tag items saved succesfully");
	}
	exports.addproductdata = function(req, res) {
		console.log("executing adding products ");
			if (!req.body.model) {
				res.json([]);
				return;
			}
		
			var commonModel = mongoose.model("req.body.model");
			req.body.model = '';
			req.body.createdAt = new Date().getTime();
			var idFOrQR=req.body.Qr_code_id;
			var stringID=idFOrQR+"";
		
			QRCode.toDataURL(stringID, function (err, url) {
				if (err) 
				console.log('error: ' + err)
				req.body.barcode_type=url;
				  
		
		  var commonFormData = new commonModel(req.body);
		
		commonFormData.save(function(err, result) {
		
				if (err) {
					res.json({
						status: false
					});
					return;
				}
		
				res.json({
					status: true,
					result: result
				});
			});
		});
			return;
		}

	
exports.updateproduct = function(req, res) {
	console.log("executing updating products ");

		var commonModel = mongoose.model("products");
		var product_id=req.body._id;
		req.body.createdAt = new Date().getTime();
		var images=req.body.image;
		var JSONData = images.replace('[','').replace(']','').split(',').map(x => x.trim());
		req.body.image=JSONData
		commonModel.findOne({_id:product_id},function(err,result){
			if(err){
				console.log(err);
				return res.json({status:false});
			}else{
				if(result!==null){

					result.name=req.body.name;
					result.category=req.body.category;

					result.sub_category_id=req.body.sub_category_id;
					result.product_url=req.body.product_url;
					result.description=req.body.description;
					result.weight=req.body.weight;
					result.price=req.body.price;
					if(req.body.catID!=''){
						result.catID=req.body.catID;
					}
					result.alert_quantity=req.body.alert_quantity;
					if(req.body.image!=''){
						result.image=req.body.image;
					}

					result.save();

					var responseData={
						status:true
						
					};
				
					console.log(responseData);
					return res.json(responseData);


				}else{
				return res.json({status:false});
				}
			}
		});
		return;
	}
	





exports.addproductReviewdata = function(req, res) {
	console.log("executing adding products ");
		if (!req.body.model) {
			res.json([]);
			return;
		}
	
		var commonModel = mongoose.model(req.body.model);
		req.body.model = '';
		req.body.createdAt = new Date().getTime();
		
	
	  var commonFormData = new commonModel(req.body);
	
	commonFormData.save(function(err, result) {
	
			if (err) {
				res.json({
					status: false
				});
				return;
			}
	
			res.json({
				status: true,
				result: result
			});
		});
	
		return;
	}
	

exports.getTagsData = function(req, res) {

	console.log("request received !");
	if (!req.body.model) {
		res.json([]);
		return;
	}
	console.log("product id :"+ req.body.ProductID);
	var commonModel = mongoose.model("Tags");

	commonModel.find({ProductID:req.body.ProductID}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
	
		else{
			console.log("products tags data"+responseData)
			res.json({
				status: true,
				data: responseData
			});
			return;
		}
		
		
	});
};


exports.getAllTags = function(req, res) {

	console.log("request received !");
	// if (!req.body.model) {
	// 	res.json([]);
	// 	return;
	// }
	var commonModel = mongoose.model("Tags");

	commonModel.find().exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
	
		else{
			console.log("products tags data"+responseData)
			res.json({
				status: true,
				data: responseData
			});
			return;
		}
		
		
	});
};

// exports.getTagsData = function(req, res) {

// 	console.log("request received !");
// 	if (!req.body.model) {
// 		res.json([]);
// 		return;
// 	}

// 	var commonModel = mongoose.model("Tags");

// 	commonModel.find().exec(function(err, responseData) {

// 		if(err) {
// 			res.json({
// 				status: false,
// 				data: responseData
// 			});
// 			return;
// 		}
	
// 		else{
// 			res.json({
// 				status: true,
// 				data: responseData
// 			});
// 			return;
// 		}
// 		console.log(responseData);
		
// 	});
// };

exports.getlastTag = function(req, res) {

	console.log("request received !");
	

	var commonModel = mongoose.model("Tags");

	commonModel.find().sort({$natural: -1})
    .limit(1).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
	
		else{
			console.log("response data:"+responseData)
			res.json({
				status: true,
				data: responseData,
			});
			return;
		}
	
		
	});
};


exports.getTagById = function(req, res) {

	console.log("request received !");
	

	var commonModel = mongoose.model("Tags");

	commonModel.findOne({TagID:req.body.TagID}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
	
		else{
			res.json({
				status: true,
				data: responseData,
				type :"Dummy tag"
			});
			return;
		}
		console.log(responseData);
		
	});
};
exports.getproductTagsData = function(req, res) {

	console.log("request received !");
	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.find({ProductID:req.body.ProductID}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
	
		else{
			res.json({
				status: true,
				data: responseData
			});
			return;
		}
		console.log(responseData);
		
	});
};


exports.getCategoriesData = function(req, res) {
  
	console.log("request received !");
	if (!req.body.model) {
		res.json([]);
		return;
	}

var commonModel = mongoose.model(req.body.model);
if(req.body.lang=='EN'){
	commonModel.find({lang:req.body.lang}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
		console.log(responseData);
		res.json(responseData);
		return;
	});
}
else if(req.body.lang=='VI'){
	commonModel.find({lang:req.body.lang}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
		console.log(responseData);
		res.json(responseData);
		return;
	});
}
	// commonModel.find().exec(function(err, responseData) {

	// 	if(err) {
	// 		res.json({
	// 			status: false,
	// 			data: responseData
	// 		});
	// 		return;
	// 	}
	// 	console.log(responseData);
	// 	res.json(responseData);
	// 	return;
	// });
};


exports.getData = function(req, res) {

	console.log("request received !");
	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.find().exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
		console.log(responseData);
		res.json(responseData);
		return;
	});
};

exports.getAllTagsData = function(req, res) {

	console.log("request received !");
	// if (!req.body.model) {
	// 	res.json([]);
	// 	return;
	// }

	var commonModel = mongoose.model("Tags");

	commonModel.find().exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
		console.log(responseData);
		res.json(responseData);
		return;
	});
};

/**
 *
 */
exports.getsubCategories =function(req, res) {
	console.log("CALELLLLED");

	console.log(req.body.model)
	console.log(req.body.condition)

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.find().exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
else{
	console.log(responseData)
	res.json({
		status: true,
		data: responseData
	});				
}
		
	});
};


exports.getsubCategoriess =function(req, res) {
	console.log("CALELLLLED");

	console.log(req.body.model)
	console.log(req.body.CategoryId)

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.find({CategoryId:req.body.CategoryId}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
else{
	console.log(responseData)
	res.json({
		status: true,
		data: responseData
	});				
}
		
	});
};


exports.getseller = function(req, res) {
	console.log(req.body.model)
	console.log(req.body.seller_id)

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.find({_id:req.body.seller_id}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
else{
	console.log(responseData)
	res.json({
		status: true,
		data: responseData
	});				
}
		
	});
};

exports.getstore = function(req, res) {
	console.log(req.body.model)
	console.log(req.body.condition)

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.findOne({seller_id:req.body.condition}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
else{
	console.log(responseData)
	res.json({
		status: true,
		data: responseData
	});				
}
		
	});
};
exports.getCondition = function(req, res) {
	console.log(req.body.model)
	console.log(req.body.condition)

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	commonModel.find(req.body.condition).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

	
	res.json(responseData)
		
		return;

		
	});
};

exports.getProductCondition = function(req, res) {
	
	//console.log(req.body.model)
	//console.log(req.body.condition)
	
	var url = require('url');
//	var url_parts = url.parse(req.url, true);
//	console.log("URL PARTS!!!!!!!!!!!!!!");
//	console.log(url_parts);
//	var productId = url_parts.productId;

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var prod=parsedQs.productId;

	console.log("QUERY STRING !!!!!");
	
	console.log(prod);
	
	//var prod=req.params.productId;
	
	//console.log("CALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl");
	
	//console.log(prod);
	
	/*
		if (!req.body.model) {
			res.json([]);
			return;
		}
	*/


	var commonModel = mongoose.model("products");

	commonModel.findOne({_id:prod}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

	console.log("RESPONDED WITH DATA:");
	console.log(responseData);

	res.json({
		status:true,
		data:responseData})
		
		return;

		
	});
};

exports.getProductsCondition = function(req, res) {
	
	//console.log(req.body.model)
	//console.log(req.body.condition)
	
	var url = require('url');
//	var url_parts = url.parse(req.url, true);
//	console.log("URL PARTS!!!!!!!!!!!!!!");
//	console.log(url_parts);
//	var productId = url_parts.productId;

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var prod=parsedQs.productId;

	console.log("QUERY STRING !!!!!");
	
	console.log(prod);
	
	//var prod=req.params.productId;
	
	//console.log("CALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl");
	
	//console.log(prod);
	
	/*
		if (!req.body.model) {
			res.json([]);
			return;
		}
	*/


	var commonModel = mongoose.model("products");

	commonModel.find({_id:prod}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

	console.log("RESPONDED WITH DATA:");
	console.log(responseData);

	res.json({
		status:true,
		data:responseData})
		
		return;

		
	});
};





exports.getProductStatusB = function(req, res) {
	
	//console.log(req.body.model)
	//console.log(req.body.condition)
	
	var url = require('url');
//	var url_parts = url.parse(req.url, true);
//	console.log("URL PARTS!!!!!!!!!!!!!!");
//	console.log(url_parts);
//	var productId = url_parts.productId;

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var prod=parsedQs.productId;

	console.log("QUERY STRING !!!!!");
	
	console.log(prod);
	
	//var prod=req.params.productId;
	
	//console.log("CALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl");
	
	//console.log(prod);
	
	/*
		if (!req.body.model) {
			res.json([]);
			return;
		}
	*/


	var commonModel = mongoose.model("products");

	commonModel.findOne({_id:prod,'approved':"true"}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

		else if(responseData.approved.includes("true")){
			res.json({
				status: true,
				data: responseData
			});
			return;
		}
		
	console.log("RESPONDED WITH DATA:");
	console.log(responseData);



		
	});
};


exports.



getProductStatus = function(req, res) {
	
	//console.log(req.body.model)
	//console.log(req.body.condition)
	
	var url = require('url');
//	var url_parts = url.parse(req.url, true);
//	console.log("URL PARTS!!!!!!!!!!!!!!");
//	console.log(url_parts);
//	var productId = url_parts.productId;

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var prod=parsedQs.productId;

	console.log("QUERY STRING !!!!!");
	
	console.log(prod);
	
	//var prod=req.params.productId;
	
	//console.log("CALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl");
	
	//console.log(prod);
	
	/*
		if (!req.body.model) {
			res.json([]);
			return;
		}
	*/


	var commonModel = mongoose.model("products");

	commonModel.findOne({_id:prod,'approved':"true"}).exec(function(err, responseData) {

		if(err) {
		throw err;
			
		}
		else if (responseData==null){
			res.json({
				status: false,
				data: responseData
			});
			return;
		}
		else {
			res.json({
				status: true,
				data: responseData
			});
			return;
		}
		
	



		
	});
};


exports.getReport = function(req, res) {
	
	//var Total=0;
	var commonModel = mongoose.model("products");
	var tagsModel = mongoose.model("Tags");
	// var x
	// commonModel.find({seller_id:req.body.seller_id}).exec(function(err,responseData){

	// 	x=responseData
	// 	console.log("This is first variable:"+x)
	// });
	// console.log(x)

	commonModel.find({seller_id:req.body.seller_id}).exec(function(err, responseData) {
	//	console.log("Inside data 1 ::: "+ responseData.approved);

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

		
		else{
			var quantity=0;
			
			var count =0;
		
		 for (var i=0 ; i<responseData.length;i++)
		 {
			var tempQuantity=responseData[i].alert_quantity;
			var intquantity=Number(tempQuantity)	
			console.log("integer"+intquantity)	
			quantity = quantity +intquantity;
					console.log("quantity"+quantity);
				
				if(responseData[i].approved=="true")
				{
			
					count++;			
				}
		 }

		 console.log("fonal total quantity"+quantity);
		

		  var Total=responseData.length;
		// Total+=count;

		
			var tagsCount=0;
			tagsModel.find({SellerID:req.body.seller_id}).exec(function(err, data) {
				if(err){
					console.log(err);
				}
				else{
					console.log("length of tags data:"+data.length)
					var	pending;
					if(count==0){
						pending="0"
					}
					if(Total==0){
						Total="0"
					}
					if(data.length==0)
							{
								tagsCount="0"
							}
					//console.log("tagsData"+data)
					res.json({
						productCount:responseData.length,
						pending:count,
						tagsCount:data.length,
						Total:Total,
						Productquantity:quantity,
						status: true,	
						data: responseData
				   });
				   return;

										
					}
			
			});
		// 	var quantity=0;
			
		// 	var count =0;
	
		//  for (var i=0 ; i<responseData.length;i++)
		//  {
		// 	var quantity=+responseData[i].alert_quantity;
		// 			quantity = +quantity
		// 			console.log("quantity"+quantity);
				
		// 		if(responseData[i].approved=="1")
		// 		{
			
		// 			count++;			
		// 		}
		//  }



		//   var Total=responseData.length;
		//   Total+=count;



 		// 	 res.json({
		// 	 productCount:responseData.length,
		// 	 pending:count,
		// 	 tagsCount:tagsCount,
		// 	 Total:Total,
		// 	 Productquantity:quantity,
		//  	 status: true,	
		// 	 data: responseData
		// });
		// return;
		}
	//console.log(responseData);

//	console.log("RESPONDED WITH DATA:"+responseData.body.approved);


		
	});
	
};






exports.getPendingProductStatus = function(req, res) {
	

	var commonModel = mongoose.model("products");

	commonModel.find({seller_id:req.body.seller_id}).exec(function(err, responseData) {
	//	console.log("Inside data 1 ::: "+ responseData.approved);

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

		// else if(responseData.approved=="1"){
		// 	console.log("Inside data");

		// 	return	res.json({
		// 		status: true,
		// 		data: responseData
		// 	});
			
		//}
		else{
		let arrayApproved=[];
		 for (var i=0 ; i<responseData.length;i++){
				if(responseData[i].approved=="false"){
				arrayApproved.push(responseData[i]);
												}
		 }

 		res.json({
			status: true,
			data: arrayApproved
		});
		return;
		}
	//console.log(responseData);

//	console.log("RESPONDED WITH DATA:"+responseData.body.approved);


		
	});
};

exports.getProductTagCondition2 = function(req, res) {
	
	//console.log(req.body.model)
	//console.log(req.body.condition)
	
	var url = require('url');
//	var url_parts = url.parse(req.url, true);
//	console.log("URL PARTS!!!!!!!!!!!!!!");
//	console.log(url_parts);
//	var productId = url_parts.productId;

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var prod=parsedQs.tagId;

	console.log("QUERY STRING !!!!!");
	
	console.log(prod);
	
	//var prod=req.params.productId;
	
	//console.log("CALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl");
	
	//console.log(prod);
	
	/*
		if (!req.body.model) {
			res.json([]);
			return;
		}
	*/


	var commonModel = mongoose.model("products");

	commonModel.findOne({tag_id:prod}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

	console.log("RESPONDED WITH DATA:");
	console.log(responseData);

	res.json({
		status:true,
		data:responseData})
		
		return;

		
	});
};



exports.getProductTagConditionDesktop = function(req, res) {
	var count =0;
	var url = require('url');

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var tagid=parsedQs.tagId;
	
	console.log("QUERY STRING !!!!!");
	
	console.log(tagid);

	var commonModel = mongoose.model("Tags");
	var productModel = mongoose.model("products");

	commonModel.findOne({TagID:tagid}).exec(function(err, responseData) {

		if(err) {
			console.log("error")
		}
	else if(responseData==null){
		res.json({
			status: false,
			message:"Tag Not Found"
		});
		return;	
	}
	else if(responseData!=null){
		if(responseData.ProductID==null){
			res.json({
				status: true,
				message:"Product not found",
				data:responseData
			});
			return;	
		}
		else{
			productModel.findOne({_id:responseData.ProductID}).exec(function(err, responseData) {
				res.json({
					status: true,
					message:"product found",
					data:responseData

				});
				return;	
			});	
		}
	}
// 
	

});
};



exports.getProductTagCondition = function(req, res) {
	var count =0;
	var url = require('url');

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var tagid=parsedQs.tagId;
	
	console.log("QUERY STRING !!!!!");
	
	console.log(tagid);

	var commonModel = mongoose.model("Tags");
	var productModel = mongoose.model("products");

	commonModel.findOne({TagID:tagid}).exec(function(err, responseData) {

		if(err) {
			console.log("error")
		}
	else if(responseData==null){
		res.json({
			status: false
		});
		return;	
	}
else{
	console.log("count before"+count);
	console.log("counter original"+responseData.counter);

	count=responseData.counter;
	
	console.log("count on getting data from counter"+count);

	count+=1;
	console.log("count after adding"+count);

	responseData.counter=count;
	console.log("responseData.counter after"+responseData.counter);
	 
	

	console.log("counter stored afrer"+responseData.counter)
	console.log("RESPONDED WITH DATA:");
	console.log(responseData)
	console.log("product id"+responseData.ProductID)
	console.log("count"+count+"counter stored"+responseData.counter)



	commonModel.updateOne({TagID:tagid},{counter:responseData.counter},function(err,tagresult){
	if(err){
	throw err;
			}
console.log("neww updated data"+tagresult)
     
	var productid=responseData.ProductID;
	productModel.findOne({_id:productid}).exec(function(err, result) {
		if(err) {
			res.json({
				status: false,
				data: result
			});
			return;
		}
	//	console.log("RESPONDED WITH product DATA of tag :");
	console.log("result of product data"+result)
		console.log("responseData.counter=="+responseData.counter)
	res.json({
		status:true,
		data:result,
		counter:responseData.counter
	})
		
		return;

		
	});
})
}
	

});
};

exports.getProductReviewsCondition = function(req, res) {
	
	//console.log(req.body.model)
	//console.log(req.body.condition)
	
	var url = require('url');
//	var url_parts = url.parse(req.url, true);
//	console.log("URL PARTS!!!!!!!!!!!!!!");
//	console.log(url_parts);
//	var productId = url_parts.productId;

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var prod=parsedQs.productId;

	console.log("QUERY STRING !!!!!");
	
	console.log(prod);
	
	//var prod=req.params.productId;
	
	//console.log("CALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl");
	
	//console.log(prod);
	
	/*
		if (!req.body.model) {
			res.json([]);
			return;
		}
	*/


	var commonModel = mongoose.model("ProductReview");

	commonModel.find({product_id:prod}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

	console.log("RESPONDED WITH DATA:");
	console.log(responseData);
	var sum =0;
	for(var i=0;i<responseData.length;i++){
	
		sum+=parseInt(responseData[i].Ratings);
	
	}
	var avg = sum/responseData.length;

	console.log("sum "+ sum + "average rating "+avg);
console.log("data "+ responseData);
	res.json({
		average_rating:avg,
		review_count:responseData.length,
		status:true,
		data:responseData})
		
		return;

		
	});
};

exports.getSellerWholeAddress = function(req, res) {
	
	var url = require('url');

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var seller_ID=parsedQs.sellerId;

	console.log("QUERY STRING !!!!!");
	
	console.log(seller_ID);
	

	var commonModel = mongoose.model("StoresDetail");

	commonModel.findOne({'seller_id':seller_ID}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

		console.log(responseData);

	res.json({
		status:true,
		data:responseData})
		
		return;

		
	});
};


exports.getProductList = function(req, res) {
	
	var url = require('url');

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var seller_ID=parsedQs.sellerId;

	console.log("QUERY STRING !!!!!");
	
	console.log(seller_ID);
	

	var commonModel = mongoose.model("products");

	commonModel.find({'seller_id':seller_ID}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

		console.log(responseData);

	res.json({
		status:true,
		data:responseData})
		
		return;

		
	});
};

exports.getApprovedProductList = function(req, res) {
	
	
	var seller_ID=req.body.seller_id;

	console.log("QUERY STRING !!!!!");
	
	console.log(seller_ID);
	

	var commonModel = mongoose.model("products");

	commonModel.find({'seller_id':seller_ID,'approved':"true"}).exec(function(err, responseData) {

		if(err) {
			res.json({
				status: false,
				data: responseData
			});
			return;
		}

		console.log(responseData);

	res.json({
		status:true,
		data:responseData})
		
		return;

		
	});
};



exports.getSellerCondition = function(req, res) {
	
	//console.log(req.body.model)
	//console.log(req.body.condition)
	
	var url = require('url');
//	var url_parts = url.parse(req.url, true);
//	console.log("URL PARTS!!!!!!!!!!!!!!");
//	console.log(url_parts);
//	var productId = url_parts.productId;

	let parsedUrl = url.parse(req.url);
	let parsedQs = querystring.parse(parsedUrl.query);
	var prod=parsedQs.productId;

	console.log("QUERY STRING !!!!!");
	
	console.log(prod);
	
	//var prod=req.params.productId;
	
	//console.log("CALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl");
	
	//console.log(prod);
	
	/*
		if (!req.body.model) {
			res.json([]);
			return;
		}
	*/


	var commonModel = mongoose.model("products");

	commonModel.findOne({_id:prod}).exec(function(err, responseData) {

		if(err) {
			
			console.log("error in fectching products ")
		}

	console.log("RESPONDED WITH DATA:");
	console.log(responseData);
	var storeModel = mongoose.model('StoresDetail');
	storeModel.findOne({_id:responseData.store_id}).exec(function(err, responseData) {

	if(err) {
		res.json({
			status: false,
			data: responseData
		});
		return;
	}
	res.json({
		status:true,
		data:responseData})
		
		return;

		
	});
});
}

/**
 *
 */
exports.getEditData = function(req, res) {
	console.log(req.body)
    if (!req.body.model) {
        return res.json([]);
    }
	console.log("Start")
    var commonModel = mongoose.model(req.body.model);

	console.log("below model")
    commonModel.update({
        _id: req.body._id
    }, req.body, {
        multi: true
    }).exec(function(err, result) {

		console.log("inside exec ")
		if (err){
			console.log("ERROR"+err)
		}
		
	console.log("below if err check")
		console. log("RESULT "+result)
        res.json({
            status: true,
            result: result
        });
    });
};

exports.getEditTagData = function(req, res) {

    if (!req.body.model) {
        return res.json([]);
    }

    var commonModel = mongoose.model(req.body.model);

    commonModel.update({
        TagID: req.body.TagID
    }, req.body, {
        multi: true
    }).exec(function(err, result) {

		if(err){
		throw err;
		}

        res.json({
            status: true,
            result: result
        });
    });
};

/**
 *
 */
exports.commonUploadFile = function(req, res) {

	var fileObject = req.files.file,
		destinationpath = filePath[req.params.key];

	var extArray = fileObject.originalFilename.split('.');
	var ext = extArray[extArray.length - 1];
	var fileName = uid(10) + '.' + ext;

	fs.readFile(fileObject.path, function(err, data) {

		if(err) {
			res.send(err);
			return;
		}

		var newPath = destinationpath + fileName;

		fs.writeFile(newPath, data, function(err) {
			if (err) {
				res.send(err);
				return;
			}
			res.send({
				original: req.files.file.name,
				image: fileName,
				status: true
			});
			return;
		});
	});
};



/**
 *
 */
exports.postUpdateChildData = function(req, res) {

	if (!req.body.model || !req.body.entityId) {
		return res.json([]);
	}

	var commonModel = mongoose.model(req.body.model);
	var entityId = req.body.entityId,
		childEntityId = req.body.childEntityId,
		entityKey = req.body.entityKey;

	delete req.body.entityId;
	delete req.body.childEntityId;
	delete req.body.entityKey;


	var saveData = function() {

		var updateData = {};
		for (var row in req.body) {
			updateData[row] = req.body[row];
		}

		var condition = {
			_id: entityId
		};

		var pull = {};
		pull[entityKey] = {
			_id: mongoose.Types.ObjectId(childEntityId)
		}

		var push = {};
		updateData._id = mongoose.Types.ObjectId(childEntityId);
		push[entityKey] = updateData;

		commonModel.update({
			'_id': entityId
		}, {
			$pull: pull
		}).exec(function(err, result) {

			if (err) {
				res.json({
					status: false,
					err: err
				});
				return;
			}


			commonModel.update({
				'_id': entityId
			}, {
				$push: push
			}).exec(function(err, result) {

				if (err) {
					res.json({
						status: false,
						err: err
					});
					return;
				}

				var sendRS = function() {
					res.json({
						status: true,
						result: updateData
					});
				}

				switch(entityKey) {
					case 'something':
					break;
						default:
						sendRS();
						break;
				}
				return;
			});
		});
	}


	if (req.body.tags) {
		getDynamicTagsByName(req.body.tags, function(tags) {
			req.body.tags = tags;
			saveData();
		});
	} else {
		saveData();
	}
}



/**
 *
 */
exports.postUpdateData = function(req, res) {

	if (!req.body.model || !req.body.entityId) {
		return res.json([]);
	}

	commonModel.update({
		'_id': req.body.entityId
	}, req.body ).exec(function(err, result) {
		res.json(result);
	});
}




/**
 *
 */

exports.postProductAddData = function(req, res) {

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);
	req.body.model = '';
	req.body.created_at = new Date().getTime();
	var images=req.body.image;
	var JSONData = images.replace('[','').replace(']','').split(',').map(x => x.trim());
	req.body.image=JSONData
	console.log(JSONData);
	console.log("imgage in body"+ req.body.image)
	var commonFormData = new commonModel(req.body);

	commonFormData.save(function(err, result) {

		console.log(result);
		if (err) {
			console.log(err);
			res.json({
				status: false
			});
			return;
		}
	console.log("Below error");
	sendProductVerification(result);
		res.json({
			status: true,
			result: result
		});
	});
	console.log("Above return");

	return;
}



exports.ProductAddData = function(req, res) {

	console.log("Request data",req.body)
	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);
	req.body.model = '';
	req.body.createdAt = new Date().getTime();
// const encoded = encodeURI(req.body.description);
// 	console.log("DDDDD"+encoded)
// 	console.log("dECODE"+decodeURI(encoded));

// 	console.log("description"+decodeURIComponent(escape(req.body.description))) ;
// 	console.log("DDDDDDDescription"+unescape(encodeURIComponent(req.body.description))) ;
	
// console.log("Description URLLLL ENCODED"+URLEncoder.encode(req.body.description, StandardCharsets.UTF_8.toString()));
	var commonFormData = new commonModel(req.body);

	commonFormData.save(function(err, result) {

		console.log(result);
		if (err) {
			console.log(err);
			res.json({
				status: false
			});
			return;
		}
	console.log("Below error");
	console.log("Response data"+result)
		res.setHeader("Content-Type","application/json; charset=utf-8")
		res.json({
			status: true,
			result: result
		});
	});
	console.log("Above return");

	return;
}
exports.postAddData = function(req, res) {

	console.log("Request data",req.body)
	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);
	req.body.model = '';
	req.body.createdAt = new Date().getTime();


	var commonFormData = new commonModel(req.body);

	commonFormData.save(function(err, result) {

		console.log(result);
		if (err) {
			console.log(err);
			res.json({
				status: false
			});
			return;
		}
	console.log("Below error");
	console.log("Response data"+result)

		res.json({
			status: true,
			result: result
		});
	});
	console.log("Above return");

	return;
}

// async function doSomething(req) {
	
// 	var commonModel = mongoose.model(req.body.model);
// 	const filter = {TagID:req.body.TagID};
// 	const update = { "ProductID": req.body.ProductID, "SellerID":req.body.SellerID, "TagLat":req.body.TagLat,"TagLong":req.body.TagLong ,"updatedAt":req.body.updatedAt};
	
// 	var doc = await commonModel.findOneAndUpdate(filter, update);

// 	console.log("DOC:"+doc);
// 	console.log("productID:"+req.body.ProductID)
// 				console.log("SLEEEEEP !")
// 	var x= commonModel.find({TagID:req.body.TagID}).exec(function(err, rez){
// 					console.log("RESZ: "+rez)
// 					console.log("AFTER SLEPPPPP")
				
// 					return;
// 				})
			
// }


//This route is created by Saira for adding th tag if it exists in the database
exports.addProductTagData = function(req, res) {

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);
	req.body.model = '';
	req.body.createdAt = new Date().getTime();
	var commonFormData = new commonModel(req.body);
	commonModel.findOne({TagID:req.body.TagID}).exec(function(err,data){
 
		if(err){
			throw err 
		}
		else if(data!=null){
			console.log("INSIDE DATA IS NOT NULL CASE")
			if(data.ProductID==null||data.ProductID==""){
				console.log("INSIDE PRODUCT ID IS NULL ")
				data.ProductID=req.body.ProductID;
			//	data.SellerID=req.body.SellerID;
				//data.SellerID=req.body.SellerID;

				// commonFormData.save(function(err, result) {
		
				// 	console.log("INSIDE SAVE METHOD NESTED")
				// 	console.log(result);
				// 	if (err) {
				// 		console.log(err);
				// 		res.json({
				// 			status: false
				// 		});
				// 		return;
				// 	}
				// console.log("Below error");
				// 	res.json({
				// 		status: true,
				// 		message:"success",
				// 		result: result
				// 	});
				// });
				data.save()
				
				console.log("UPDATED PRODUCT ID INSIDE TAG");
				res.json({
						status: true,
						message:"success",
						result: data
					});
		
				return;
			}
			else{
				console.log("Tag already exists"+"with product id :"+data.ProductID)
				res.json({
					status: true,
					message: "Tag already exists"
				});
				return;
			}
		}
		 
		// else if (data.ProductID!==null)
		// {
		// 	res.json({
		// 		message: "Tag already exists"
		// 	});
		// 	return;
		// }
		else
		{
			console.log("Tag does not exists")

			res.json({
				status:true,
				message: "Tag does not exists"
	
			});
			return;
		}
	});
}


exports.addProductTagDataEncodeVerify = function(req, res) {
	if (!req.body.model) {
		res.json([]);
		return;
	}
	var commonModel = mongoose.model(req.body.model);
	req.body.model = '';
	req.body.updatedAt = new Date().getTime();
	req.body.createdAt = new Date().getTime();

	var commonFormData = new commonModel(req.body);
	console.log("tag id "+req.body.TagID)
	const filter = {TagID:req.body.TagID};
	const update = { "ProductID": req.body.ProductID, "SellerID":req.body.SellerID, "TagLat":req.body.TagLat,"TagLong":req.body.TagLong ,"updatedAt":req.body.updatedAt};
	let doc =  commonModel.findOneAndUpdate(filter, update);
	console.log("DOC:"+doc);
	commonModel.findOne({TagID:req.body.TagID}).exec(function(err,data){
 	console.log("tag data after findone:"+data)
		if(err){
			throw err 
		}
		else if(data){
			if(!data.ProductID){
			try{			
				console.log("INSIDE PRODUCT ID IS NULL ")
				data.ProductID=req.body.ProductID;
				data.SellerID=req.body.SellerID;
				data.TagLat=req.body.TagLat;
				data.TagLong=req.body.TagLong;
				data.updatedAt=req.body.updatedAt;
				data.save();
				console.log("productID:"+req.body.ProductID)
				console.log("SLEEEEEP !")
				// commonModel.find({TagID:req.body.TagID}).exec(function(err, rez){
				// 	console.log("RESZ: "+rez)
				// })
				// console.log("AFTER SLEPPPPP")
				
				// return;
				commonModel.find({ProductID:req.body.ProductID}).exec(function(err,response){
					console.log("inside Common model find")
				if(err){
					console.log("inside if err")
					throw err;
				}

				else {
					console.log("RESPONSE: "+response)
					if(response==null){
						console.log("Null response")
					}else{
					console.log("inside else")
						
					res.json({
							status: true,
							message:"success",
							result: response
						});
					}
					return;
					}
					
				});	
		
			}catch(err){
				console.log(err)
			}

			}
			else if (data.ProductID!=null){
				console.log("Tag already exists")
				res.json({
					status: false,
					message: "Tag already exists"
				});
				return;
			}
		}
	
		else if(data==null)
		{
			console.log("Tag does not exists")

			res.json({
				status:false,
				message: "Tag does not exists"
	
			});
			return;
		}
	});

	
}


exports.EncodeVerifyList = function(req, res) {
	console.log("request data"+ req.body.myarray  +"TYPE OF "+typeof(req.body.myarray));	
	console.log("product id"+req.body.ProductID+"quantity"+req.body.quantity);	
	var commonModel = mongoose.model("Tags");
	var JSONData;
	var	productTags
	var JSONData =JSON.parse(req.body.myarray);	
	var quantity=req.body.quantity;
	
	commonModel.countDocuments({ProductID:req.body.ProductID}, function(err, c) {
			console.log('Count is ' + c);
			productTags=c;
            		if(productTags==quantity){
						console.log("full tags for product")
						return res.json({
							status:false,
							message:"full tag"
						});		
					}
//	if(count<=quantity){
//	console.log("productTags"+productTags);
else{
	JSONData.forEach (function(item){
		//console.log("TAGGGGGG IDDD :"+item.tag_id)
	//	if(productTags<quantity){

		
		commonModel.findOne({TagID:item.tagID},function(err,result){
			//console.log("tag found result1"+result);
			if(err)
			{
				throw err;
			}
			
			else if(result)
			{
				//console.log("tag found result2"+result);
				if(!result.ProductID){
					if(productTags<quantity){
					console.log("Product id not found");
					console.log("after if statement "+productTags+"quantity "+quantity);

						result.ProductID=item.productID,
						//result.SellerID=item.sellerID,
						result.updatedAt=new Date().getTime(),
						result.BusinessID=item.businessID,
						result.TagLat=item.tagLat,
						result.TagLong=item.tagLong
						
						result.save();
						productTags++;
						console.log("productTags after increment"+productTags)
					//console.log("taglist obj"+taglist)
					console.log("tag found result after saved"+result);
					}

				}					
			}	
		});	
	//}	
	// else{
	// 	console.log("Cannot Add more Tags");

		
	// }	
	});		
	return res.json({
		status:true
	});	
}		
	
	});
		
}


exports.addProductTagDataDesktop = function(req, res) {

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);
	req.body.model = '';
	req.body.createdAt = new Date().getTime();
	var commonFormData = new commonModel(req.body);

	commonModel.findOne({JeptagID:req.body.JeptagID}).exec(function(err,data){
		if(err){
			throw err 
		}

		else if(data!=null){
			res.json({
			
				message:"Jeptag ID already exists!",
				
			});

		return;
		}
		else {
			commonModel.findOne({TagID:req.body.TagID}).exec(function(err,data){
 
				if(err){
					throw err 
				}
				else if(data!=null){
					console.log("INSIDE DATA IS NOT NULL CASE")
					if(data.ProductID==null){
						// commonModel.findOne( {sort:{$natural:-1}}).exec(function(err,data){
		 
						// 	if(err){
						// 		throw err 
						// 	}
						// 		else{
						// 		req.body.JeptagID=data.JeptagID
						// 			}
						// 		});
						console.log("INSIDE PRODUCT ID IS NULL ")
						data.ProductID=req.body.ProductID;
						data.SellerID=req.body.SellerID;
						data.JeptagID=req.body.JeptagID;
						//data.SellerID=req.body.SellerID;
		
						// commonFormData.save(function(err, result) {
				
						// 	console.log("INSIDE SAVE METHOD NESTED")
						// 	console.log(result);
						// 	if (err) {
						// 		console.log(err);
						// 		res.json({
						// 			status: false
						// 		});
						// 		return;
						// 	}
						// console.log("Below error");
						// 	res.json({
						// 		status: true,
						// 		message:"success",
						// 		result: result
						// 	});
						// });
						data.save()
						
						console.log("UPDATED PRODUCT ID INSIDE TAG");
						res.json({
								status: true,
								message:"success",
								result: data
							});
				
						return;
					}
					else{
						console.log("Tag already exists")
						res.json({
							status: true,
							message: "Tag already exists"
						});
						return;
					}
				}
				 
				// else if (data.ProductID!==null)
				// {
				// 	res.json({
				// 		message: "Tag already exists"
				// 	});
				// 	return;
				// }
				else
				{
					console.log("Tag does not exists")
		
					res.json({
						status:true,
						message: "Tag does not exists"
			
					});
					return;
				}
			});
		}
	});

	
}
// exports.addProductTagDataDesktop2 = function(req, res) {

// 	if (!req.body.model) {
// 		res.json([]);
// 		return;
// 	}

// 	var commonModel = mongoose.model(req.body.model);
// 	req.body.model = '';
// 	req.body.createdAt = new Date().getTime();
// 	var commonFormData = new commonModel(req.body);

// 	// commonModel.findOne({JeptagID:req.body.JeptagID}).exec(function(err,data){
// 	// 	if(err){
// 	// 		throw err 
// 	// 	}

// 	// 	else if(data!=null){
// 	// 		res.json({
			
// 	// 			message:"Jeptag ID already exists!",
				
// 	// 		});

// 	// 	return;
// 	// 	}
// 	// 	else {
// 			commonModel.findOne({TagID:req.body.TagID}).exec(function(err,data){
 
// 				if(err){
// 					throw err 
// 				}
// 				else if(data!=null){
// 					console.log("INSIDE DATA IS NOT NULL CASE")
// 					if(data.ProductID==null){
// 						// commonModel.findOne( {sort:{$natural:-1}}).exec(function(err,data){
		 
// 						// 	if(err){
// 						// 		throw err 
// 						// 	}
// 						// 		else{
// 						// 		req.body.JeptagID=data.JeptagID
// 						// 			}
// 						// 		});
// 						console.log("INSIDE PRODUCT ID IS NULL ")
// 						data.ProductID=req.body.ProductID;
// 						data.SellerID=req.body.SellerID;
// 						data.JeptagID=req.body.JeptagID;
// 						//data.SellerID=req.body.SellerID;
		
// 						// commonFormData.save(function(err, result) {
				
// 						// 	console.log("INSIDE SAVE METHOD NESTED")
// 						// 	console.log(result);
// 						// 	if (err) {
// 						// 		console.log(err);
// 						// 		res.json({
// 						// 			status: false
// 						// 		});
// 						// 		return;
// 						// 	}
// 						// console.log("Below error");
// 						// 	res.json({
// 						// 		status: true,
// 						// 		message:"success",
// 						// 		result: result
// 						// 	});
// 						// });
// 						data.save()
						
// 						console.log("UPDATED PRODUCT ID INSIDE TAG");
// 						res.json({
// 								status: true,
// 								message:"success",
// 								result: data
// 							});
				
// 						return;
// 					}
// 					else{
// 						console.log("Tag already exists")
// 						res.json({
// 							status: true,
// 							message: "Tag already exists"
// 						});
// 						return;
// 					}
// 				}
				 
// 				// else if (data.ProductID!==null)
// 				// {
// 				// 	res.json({
// 				// 		message: "Tag already exists"
// 				// 	});
// 				// 	return;
// 				// }
// 				else
// 				{
// 					console.log("Tag does not exists")
		
// 					res.json({
// 						status:true,
// 						message: "Tag does not exists"
			
// 					});
// 					return;
// 				}
// 			});
// 	//	}
// 	//});

	
// }
exports.addProductTagDataDesktop2 = function(req, res) {

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);
	req.body.model = '';
	req.body.createdAt = new Date().getTime();
	var commonFormData = new commonModel(req.body);

	commonModel.findOne({JeptagID:req.body.JeptagID}).exec(function(err,data){
		if(err){
			throw err 
		}

		else if(data!=null){
			res.json({
			
				message:"Jeptag ID already exists!",
				
			});

		return;
		}
		else {
			commonModel.findOne({TagID:req.body.TagID}).exec(function(err,data){
 
				if(err){
					throw err 
				}
				// else if(data==null){

				// }
				else if(data==null){
					console.log("INSIDE DATA IS NOT NULL CASE")
				//	if(data.ProductID==null){
						// commonModel.findOne( {sort:{$natural:-1}}).exec(function(err,data){
		 
						// 	if(err){
						// 		throw err 
						// 	}
						// 		else{
						// 		req.body.JeptagID=data.JeptagID
						// 			}
						// 		});

					
						data.TagID=req.body.TagID;
						data.TagType=req.body.TagType;					
						data.SellerID=req.body.SellerID;
						data.JeptagID=req.body.JeptagID;
						//data.SellerID=req.body.SellerID;
		
						// commonFormData.save(function(err, result) {
				
						// 	console.log("INSIDE SAVE METHOD NESTED")
						// 	console.log(result);
						// 	if (err) {
						// 		console.log(err);
						// 		res.json({
						// 			status: false
						// 		});
						// 		return;
						// 	}
						// console.log("Below error");
						// 	res.json({
						// 		status: true,
						// 		message:"success",
						// 		result: result
						// 	});
						// });
						data.save()
						
						console.log("UPDATED PRODUCT ID INSIDE TAG");
						res.json({
								status: true,
								message:"success",
								result: data
							});
				
						return;
		//	}
					// else{
					// 	console.log("Tag already exists")
					// 	res.json({
					// 		status: true,
					// 		message: "Tag already exists"
					// 	});
					// 	return;
					// }
				}
				 
				// else if (data.ProductID!==null)
				// {
				// 	res.json({
				// 		message: "Tag already exists"
				// 	});
				// 	return;
				// }
				else if(data!=null){
				
					console.log("Tag already exists")
		
					res.json({
						status:true,
						message: "Tag already exists"
			
					});
					return;
				}
			});
		}
	});

	
}


// this is for adding a single tag
exports.AddTag = function(req, res) {
	console.log("callled");

	var commonModel = mongoose.model("Tags");
	//req.body.createdAt = new Date().getTime();

	var commonFormData = new commonModel(req.body);
	//commonModel.find({$or:[{'TagID':req.body.TagID},{'JeptagID':req.body.JeptagID}]},function(err,data){
commonModel.findOne({TagID:req.body.TagID}).exec(function(err, data){
	console.log("inside find ");
		console.log(req.body.JeptagID);
		console.log(req.body.TagID);

		console.log("data  found" + data);
		//console.log("jeptag id in datas"+data.JeptagID);

		if(err){
			console.log("error in getting data");
		  }
		  else{
		   if (data==null) {
			
			console.log("tag  id not found");
			commonFormData.save(function(err, result) {

				console.log(result);
				if (err) {
					console.log(err);
					res.json({
						message:"error",
					});
					return;
				}
			
			console.log("Below error");
			
				res.json({
					message:"true",
					result: result
				});
				return;

			});
			}

			else if(data.JeptagID==req.body.JeptagID){
				console.log("jeptag id found "+data.JeptagID);

			res.json({
				message:"Jeptag ID already exists!",
				result: result
			
			});
			return;

			}
			else if (data.TagID==req.body.TagID){
	  
			  console.log("tag id found "+data.TagID);
			  
			  res.json({
				  message:"TagID already exists!",
				  result: result
							
			});
		  
			return;

		  }
		  else{
			console.log("cannot save data "+data);
			
		  }
		}
	 
	});

}
	



exports.addDemoConditions = function(req, res) {


	var commonModel = mongoose.model("conditionS");
	req.body.createdAt = new Date().getTime();
	
	var commonFormData = new commonModel({name:"used"});

	commonFormData.save(function(err, result) {

		console.log(result);
		if (err) {
			console.log(err);
			res.json({
				status: false
			});
			return;
		}
	console.log("Below error");
		res.json({
			status: true,
			result: result
		});
	});
	console.log("Above return");

	return;
}


exports.postDesktopUserLoginData = function(req, res) {

	if (!req.body.model) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);
	req.body.model = '';
	//req.body.createdAt = new Date().getTime();
	
	var commonFormData = new commonModel(req.body);

	commonFormData.save(function(err, result) {

		console.log(result);
		if (err) {
			console.log(err);
			res.json({
				status: false
			});
			return;
		}
	console.log("Below error");
		res.json({
			status: true,
			result: result
		});
	});
	console.log("Above return");

	return;
}



/**
 *
 */
exports.getDeleteData = function(req, res) {
	console.log("product deleted route callled "+req.body._id)

	if (!req.body.model || !req.body._id) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	// Delete common Data
	commonModel.findOne({ _id: req.body._id}).remove(function(err, result) {
		if (err) {
			console.log("err ")

			res.json({
				status: false
			});
			return;
		}
else{
	console.log(" deleted ")

		res.json({
			status: true,
			responseIds: req.body._id
		});
		return;
		console.log("product deleted ")
	}
	});

};


/**
 *
 */
exports.getDeleteDataCondition = function(req, res) {

	if (!req.body.model || !req.body._id) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	// Delete common Data
	commonModel.find(req.body.condition).remove(function(err, result) {

		if (err) {
			res.json({
				status: false
			});
			return;
		}

		res.json({
			status: true
		});
		return;
	});
}



exports.getDeleteDataCondition = function(req, res) {

	if (!req.body.model || !req.body._id) {
		res.json([]);
		return;
	}

	var commonModel = mongoose.model(req.body.model);

	// Delete common Data
	commonModel.find(req.body.condition).remove(function(err, result) {

		if (err) {
			res.json({
				status: false
			});
			return;
		}

		res.json({
			status: true
		});
		return;
	});
}
