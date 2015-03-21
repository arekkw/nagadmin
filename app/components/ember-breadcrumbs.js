import Ember from 'ember';

export default Ember.Component.extend({
    tagName: "ul",
    classNames: ["breadcrumb"],
    
/*    router: function() {
      var router = this.container.lookup('router:main');
      router.on('didTransition', this, this.didTransition);
      return router;
    }.property(),
     
    didTransition: function() {
      if(!this.isDestroyed){
        this.set('handlerInfos', this.get('router.router.currentHandlerInfos'));
      }
    },
    
    handlerInfos: function(key, value) {
      if (value) {
        return value;
      } else {
        return this.get('router.router.currentHandlerInfos');
      }
    }.property('router.router.currentHandlerInfos.[]'),
    
    pathNames: (function() {
      var handlerInfos = this.get('handlerInfos');
      if (handlerInfos) {
        return handlerInfos.map(function(handlerInfo) {
          return handlerInfo.name;
        });
      } else {
        return [];
      }
    }).property("handlerInfos.[]"),
    
    controllers: (function() {
      var handlerInfos = this.get('handlerInfos');
      if (handlerInfos) {
        return handlerInfos.map(function(handlerInfo) {
          return handlerInfo.handler.controller;
        });
      } else {
        return [];
      }
    }).property("handlerInfos.[]"),
    
    breadCrumbs: (function() {
      var breadCrumbs, controllers, deepestCrumb, defaultPaths;
      controllers = this.get("controllers");
      defaultPaths = this.get("pathNames");
      breadCrumbs = [];
      controllers.forEach(function(controller, index) {
        var crumbName, defaultPath, iconClass, specifiedPath;
        crumbName = controller.get("breadCrumb");
        if (!Ember.isEmpty(crumbName)) {
          defaultPath = defaultPaths[index];
          specifiedPath = controller.get("breadCrumbPath");
          iconClass = controller.get("breadCrumbIconClass");
          return breadCrumbs.addObject({
            name: crumbName,
            path: specifiedPath || defaultPath,
            linkable: specifiedPath !== false,
            isCurrent: false,
            hasIcon: !Ember.isEmpty(iconClass),
            iconClass: iconClass
          });
        }
      });
      deepestCrumb = breadCrumbs.get("lastObject");
      if (deepestCrumb) {
        deepestCrumb.isCurrent = true;
      }
      return breadCrumbs;
    }).property("controllers.@each.breadCrumb", "controllers.@each.breadCrumbPath", "pathNames.[]")*/
});
