'use strict';

appModule.factory('IcMean', [
  function() {
    return {
      name: 'ic-mean'
    };
  }
]);


appModule.factory('icdb', ['$http', function($http) {
    var dataFactory = {};

    dataFactory.insert = function(model, data, callback) {
        data.model = model;
        $http.post('/api/common/add-data', data).success(function(result) {
            callback(result);
        });
    };

    dataFactory.update = function(model, _id, data, callback) {
        data.model = model;
        data._id = _id;
        $http.post('/api/common/edit-data', data).success(function(result) {
            callback(result);
        });
    };

    dataFactory.updateAddChild = function(model, entityId, entityKey, data, callback) {
        data.model = model;
        data.entityId = entityId;
        data.entityKey = entityKey;
        $http.post('/api/common/update-data', data).success(function(result) {
            callback(result);
        });
    };

    dataFactory.updateChild = function(model, entityId, entityKey, childEntityId, data, callback) {
        data.model = model;
        data.entityId = entityId;
        data.childEntityId = childEntityId;
        data.entityKey = entityKey;
        $http.post('/api/common/update-child-data', data).success(function(result) {
            callback(result);
        });
    };

    dataFactory.removeChilds = function(model, entityId,entityKey, data, callback) {
        data.model = model;
        data._id = entityId;
        data.entityKey = entityKey;
        $http.post('/api/common/delete', data).success(function(result) {
            callback(result);
        });
    };
    
    dataFactory.insertChild = function(model, entityId, entityKey, data, callback) {
        data.model = model;
        data.entityId = entityId;
        data.entityKey = entityKey;
        data.isChildInsert = true;
        $http.post('/api/common/add-data', data).success(function(result) {
            callback(result);
        });
    };

    dataFactory.remove = function(model, _id, callback) {
        $http.post('/api/common/delete', {
            model: model,
            _id: _id
        }).success(function(result) {
            callback(result);
        });
    };

    dataFactory.get = function(model, callback) {
        $http.post('/api/common/get-data',{
            model: model
        }).success(function(result) {
            callback(result);
        });
    };

    dataFactory.getCondition = function(model, condition, callback) {
        $http.post('/api/common/get-condition',{
            model: model,
            condition: condition
        }).success(function(result) {
            callback(result);
        });
    };

    dataFactory.getSingle = function(model, _id, callback) {
        $http.post('/api/common/single-data',{
            model: model,
            _id: _id
        }).success(function(result) {
            callback(result);
        });
    };

    dataFactory.removeChilds = function(model, entityId,entityKey, data, callback) {
        data.model = model;
        data._id = entityId;
        data.entityKey = entityKey;
        $http.post('/api/common/delete', data).success(function(result) {
            callback(result);
        });
    };


    return dataFactory;
}]);



appModule.factory('alertService',['toastr', function(toastr) {
    var alertService = {}

    var generateMsg = function(msgType, msg) {
        if(msgType == 'success'){
            toastr.success(msgType,msg);
        }else{
            toastr.error(msgType,msg);
        }
    }

    alertService.flash = function(type, msg, isRedirect) {
        if (type == "success" || type == "error") {
            generateMsg(type, msg);
        }
    };

    return alertService;
}]);
