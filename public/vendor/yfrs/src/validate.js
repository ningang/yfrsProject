var validate = {
	init:function() {
		console.log(this);
		this.spec_validator();
	}
};
var spec = {
	spec_config:{
		dom:$('#spec-form'),
		rules:{
			"sort":{number:true}
		},
		message:{
			"sort":{number:"排序值是数字"}
		}
	},
	spec_validator:function() {
		yfrs.validate(this.spec_config.dom,this.spec_config.rules,this.spec_config.message);
	}
};
var shop = {
	shop_config:{
		dom:$('#spec-form'),
		rules:{
			"sort":{number:true}
		},
		message:{
			"sort":{number:"排序值是数字"}
		}
	},
	shop_validator:function() {
		yfrs.validate(this.config.dom,this.config.rules,this.config.message);
	}
};
yfrs.extend(validate,spec,shop);
validate.init();