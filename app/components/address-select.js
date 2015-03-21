import Ember from 'ember';
import { arrayMap } from 'nag-admin/helpers/array-map';

export default Ember.Component.extend({
    addressModel: null,
    
    init: function(){
        var self = this;
        var store = this.container.lookup('store:main');
        store.find('ref/province').then(function(provinces) {
            self.set('provinceList', provinces);
        });
        
        //default if model province not set and defaultProvince set
        if(!this.get('addressModel.province.id') && this.get('defaultProvince')){
            store.find('ref/province', this.get('defaultProvince')).then(function(prov) {
                self.set('addressModel.province', prov);
            });
        }
        this._super();
    }.on('init'),
   
    districtList: function(){
        if(this.get('addressModel.province.districts')){
            return arrayMap(this.get('addressModel.province.districts'));
        }
    }.property('addressModel.province.districts'),
    
    metroList: function(){
        if(this.get('addressModel.province.metros')){
            return arrayMap(this.get('addressModel.province.metros'));  
        }
    }.property('addressModel.province.metros'),
    
    muniList: function(){
        var dist = this._currentType('district');
        if(dist){
            return arrayMap(dist.munis);  
        }
    }.property('addressModel.district'),
    
    wardList: function(){
        var metro = this._currentType('metro');
        var muni = this._currentType('muni');
        if(metro){
            return arrayMap(metro.wards);  
        } else if(muni){
            return arrayMap(muni.wards);  
        }  
    }.property('addressModel.metro', 'addressModel.muni'),
    
    selectedProvince: function(k,prov){
        //undefined sent on initial load/reload
        if(prov === undefined){
            if(this.get('addressModel.province.content')){
                prov = this.get('addressModel.province.content');
            }
        } else { // null implies province is explicitly changed
            //funky case where the page is loading
            if(this.get('isLoading') && prov === null){
                return prov;
            }
            this.set('addressModel.metro', null);
            this.set('addressModel.muni', null);
            //this.set('addressModel.district', null);
            this.set('addressModel.province', prov);
        }
        return prov;
    }.property('addressModel.province.id'),
    
    selectedDistrict: function(k,dist) {
        //undefined sent on initial load/reload
        if(dist === undefined){
            dist = this._currentType('district');
            if(dist){
                console.log("setting district to: " + dist.id);
            } else {
                console.log("setting district to: undefined");
            }
            return dist;
        }
        if(!dist){
            console.log("setting district to: NULL");
            this.set('addressModel.district', null);
            this.set('addressModel.muni', null);
            return;
        }
        
        this.set('addressModel.district', dist.id);
        this.set('addressModel.muni', null);
        return dist;
    }.property(),
    
    selectedMetro: function(k,metro) {
        //undefined sent on initial load/reload
        if(metro === undefined){
            return this._currentType('metro');
        }
        if(!metro){
            this.set('addressModel.metro', null);
            this.set('addressModel.ward', null);
            return;
        }
        this.set('addressModel.metro', metro.id);
        this.set('addressModel.ward', null);
        return metro;
    }.property(),

    selectedMuni: function(k,muni) {
        //undefined sent on initial load/reload
        if(muni === undefined){
            return this._currentType('muni');
        }
        if(!muni){
            this.set('addressModel.muni', null);
            this.set('addressModel.ward', null);
            return;
        }
        console.log("setting muni to: " + muni.id);
        this.set('addressModel.muni', muni.id);
        this.set('addressModel.ward', null);
        return muni;
    }.property(),
    
    selectedWard: function(k,ward) {
         //undefined sent on initial load/reload
        if(ward === undefined){
            return this._currentType('ward');
        }
        if(!ward){
            this.set('addressModel.ward', null);
            return;
        }
        
        this.set('addressModel.ward', ward.id);
        return ward;
    }.property(),
    
    showDist: function() {
         return !this.get('addressModel.metro');
    }.property('addressModel.district','addressModel.metro'),
    
    showMetro: function() {
         return !this.get('addressModel.district');
    }.property('addressModel.metro','addressModel.district'),
    
    showMuni: function() {
         return this.get('addressModel.district');
    }.property('addressModel.district'),
    
    showWard: function() {
         return this.get('addressModel.metro') || this.get('addressModel.muni');
    }.property('addressModel.metro', 'addressModel.muni'),
    
    _currentType: function(type){
        if(!this.get('addressModel.' + type)){
            return null;
        }
        var self = this;
        var _type = null;
        var list = this.get(type + 'List');
        if(list){
            list.forEach(function(el){
                if(el.id === self.get('addressModel.' + type)){
                    _type = el;
                    return;//break the loop
                }
            });
        }
        return _type; 
    }
});
