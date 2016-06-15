/**
 * Created by IvanP on 10.06.2016.
 */

class ConfirmitBase {

  /*allows changing properties with deep nested sub-properties via dotted syntax. Notifies with 'property-changed' event*/
  static update(obj,value){
    //console.log('will set '+ obj + ' to ' + value);
    let o=this, first, _prev;
    if(obj.indexOf('.')>0){ // it's a deep property
      var deep = obj.split('.');
      first=deep[0];
      for(var i=0; i<deep.length; i++){
        if(i===0){
          o=o[deep[i]];
          _prev = JSON.parse(JSON.stringify(o));
        } else if(o[deep[i]]){
          if(i<deep.length -1){o=o[deep[i]]} else {
            o[deep[i]] = value;
          }
        } else {console.error('sub-property '+ deep[i] +' doesn\'t exist'); return}
      }
    } else {
      _prev= o[obj];
      first = obj;
      o[obj] = value;
    }
    if(_prev!==this[first]){
      $(this).trigger({type:first+'-changed', detail:[this[first], _prev]});
    }
  }

  /**
   * Copies props from a source object to a target object.
   *
   * Note, this method uses a simple `for...in` strategy for enumerating
   * properties.  To ensure only `ownProperties` are copied from source
   * to target and that accessor implementations are copied, use `extend`.
   *
   * @method mixin
   * @param {Object} target Target object to copy properties to.
   * @param {Object} source Source object to copy properties from.
   * @return {Object} Target object that was passed as first argument.
   */
  static mixin(target, source) {
    for (var i in source) {
      target[i] = source[i];
    }
    return target;
  }

  _logger(level, args) {
    // accept ['foo', 'bar'] and [['foo', 'bar']]
    if (args.length === 1 && Array.isArray(args[0])) {
      args = args[0];
    }
    // only accept logging functions
    switch(level) {
      case 'log':
      case 'warn':
      case 'error':
        console[level].apply(console, args);
        break;
    }
  }

  static _log() {
    var args = Array.prototype.slice.call(arguments, 0);
    this._logger('log', args);
  }

  static _warn() {
    var args = Array.prototype.slice.call(arguments, 0);
    this._logger('warn', args);
  }

  static _error() {
    var args = Array.prototype.slice.call(arguments, 0);
    this._logger('error', args);
  }

  static _logf(/* args*/) {
    return this._logPrefix.concat(this.is).concat(Array.prototype.slice.call(arguments, 0));
  }
}

class Confirmit extends ConfirmitBase{
  constructor(prototype){
    console.log(prototype);
    super()
    

    var factory = prototype;
    if(factory.properties){
      this.desugarProperties(factory);
    }
    if(factory.options){
      factory = super.mixin(factory,factory.options);
    }
    if(factory.listeners) {
      var host = factory.context;
      for (var eventName in factory.listeners) {
        var node, name;
        if (eventName.indexOf('.') < 0) {
          node = host;
          name = eventName;
        } else {
          name = eventName.split('.');
          node = host.querySelector('#' + name[0]);
          name = name[1];
        }
        $(node).on(name, host[factory.listeners[eventName]]);
      }
      delete factory.listeners;
    }

    /*initialize the programme*/
    if(factory.init){factory.init()}


  }
  desugarProperties(proto){
    proto._defaultProperties = proto._defaultProperties || {};
    $.extend(true, proto._defaultProperties, proto.properties);
    var prop='';
    for(prop in proto.properties){
      if(!(prop in proto)) {
        if (proto.properties[prop].observer) {//property observer
          $(proto.context).on(prop + '-changed', proto[proto.properties[prop].observer]);
        }
      }
      proto[prop] = proto.properties[prop].value;
    }
    delete proto.properties;
    return proto;
  };
}

module.exports = Confirmit;
