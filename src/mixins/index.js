let stream = weex.requireModule('stream');
let modal = weex.requireModule('modal');
let domModule = weex.requireModule('dom');
let eventBus = new Vue();
export default {
  methods: {
    jump(to) {
      if (this.$router) {
        this.$router.push(to)
      }
    },
    isIpx() {
      return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6');
    },
    GET(api, callback) {
      return stream.fetch({
        method: 'GET',
        type: 'json',
        url: 'http://cdn.zwwill.com/yanxuan/' + api
        // url: 'http://10.242.69.181:8089/yanxuan/' + api
      }, callback)
    },
    POST(api, body, callback) {
      return stream.fetch({
        method: 'POST',
        type: 'json',
        headers: {
          //post json的话 必须设置content-type如此，默认是 application/x-www-form-urlencoded
          'Content-Type': 'application/json'
        },
        body: body,
        url: api
      }, callback)
    },
    Toast(_message, _duration, _callback) {
      return modal.toast({
        message: _message,
        duration: _duration | 0.3,
      }, _callback)
    },
    sendEvent(_eventName, _callback) {
      eventBus.$emit(_eventName, _callback);
    },

    handleEvent(_eventName,_callback){
      eventBus.$on(_eventName,_callback)
    },

    initIconFont (_ttf){
      domModule.addRule('fontFace',{
        'fontFamily': "iconfont",
        'src': `url('http:${_ttf}')`
      })
    },
  }
}
