//let serverContext = 'https://ezauth.settlebank.co.kr';
let serverContext = 'http://localhost:8080';

let Msg = {
    dev_err1: "잠시 후 다시 이용해주시기 바랍니다."
}

let Util = {
    isMobile : function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
}

let SettlePay = {

    getUrl : function(obj){
        let processType;
        let url = "";
        try{
            processType = obj.processType.value;
            if(processType === "D" || processType === "M" || processType === "A"){
                //url = serverContext + "/std/init.do";
                url = serverContext + "/init.do";
            }else if(processType === "W"){//�섏뒳�꾩슜
                url = serverContext + "/whistle/init.do";
            }
        }catch(e){
            processType='D';
            url = serverContext + "/login";
        }

        return url;
    }
    ,pay : function(obj){
        let viewType;
        try{
            viewType = obj.viewType.value;
        }catch(e){
            viewType='popup';
        }

        viewType != null ? viewType : 'popup';
        if(viewType === 'popup'){
            this.popup(obj);
        }else if(viewType === 'self'){
            this.self(obj);
        }
    }

    // 寃곗젣李� �몄텧
    ,execute : function(obj){
        if (Util.isMobile()){
            SettlePay.self(obj);
        }else{
            SettlePay.popup(obj);
        }
    }

    // �쒕퉬�ㅺ�由ъ갹 �몄텧
    ,svc_execute : function(obj){
        if (Util.isMobile()){
            SettlePay.svc_mobile(obj);
        }else{
            SettlePay.svc_popup(obj);
        }
    }

    // �앹뾽
    ,popup : function(obj) {
        const userAgent = new String(navigator.userAgent);
        let windowStatus = '';
        if (userAgent.indexOf('Trident') > 0) {
            if (userAgent.indexOf('Trident/4.0') > 0){
                windowStatus = 'left=100, top=100, height=610, width=420, location=no, menubar=no, scrollbars=yes, status=no, titlebar=no, toolbar=no, resizable=no';
            }else{
                windowStatus = 'left=100, top=100, height=610, width=420, location=no, menubar=no, scrollbars=yes, status=no, titlebar=no, toolbar=no, resizable=no';
            }
        }
        else if (userAgent.indexOf('AppleWebKit') > 0 && userAgent.indexOf('Chrome') === -1) {
            windowStatus = 'left=100, top=100, height=610, width=420, location=no, menubar=no, scrollbars=auto, status=no, titlebar=no, toolbar=no, resizable=no';
        }
        else {
            windowStatus = 'left=100, top=100, height=610, width=420, location=no, menubar=no, scrollbars=auto, status=no, titlebar=no, toolbar=no, resizable=no';
        }
        stdpaywin = window.open('', obj.name, windowStatus);

        setTimeout(function(){
            if (stdpaywin == null) {
                alert(Msg.dev_err1)
            }
        }, 1000)

        obj.action = SettlePay.getUrl(obj);
        obj.method='GET';
        obj.target=obj.name;
        obj.submit();
    }
    ,self : function(obj) {
        obj.action = SettlePay.getUrl(obj);
        obj.method='POST';
        obj.target='_self';
        obj.submit();
    }
    ,mobile : function(obj) {
        stdpaywin = window.open('', obj.name, '');
        setTimeout(function(){
            if (stdpaywin == null) {
                alert(Msg.dev_err1)
            }
        }, 1000)

        obj.action = SettlePay.getUrl(obj);
        obj.method='POST';
        obj.target=obj.name;
        obj.submit();
    }
    ,cashRcptInfo : function(obj){
        obj.action = serverContext + "/cashRcptInfo.do";
        obj.method='POST';
        obj.target='_blank';
        obj.submit();
    },svc_popup : function (obj){
        const userAgent = new String(navigator.userAgent);
        let windowStatus = '';
        if (userAgent.indexOf('Trident') > 0) {
            if (userAgent.indexOf('Trident/4.0') > 0){
                windowStatus = 'left=100, top=100, height=610, width=420, location=no, menubar=no, scrollbars=yes, status=no, titlebar=no, toolbar=no, resizable=no';
            }else{
                windowStatus = 'left=100, top=100, height=610, width=420, location=no, menubar=no, scrollbars=yes, status=no, titlebar=no, toolbar=no, resizable=no';
            }
        }
        else if (userAgent.indexOf('AppleWebKit') > 0 && userAgent.indexOf('Chrome') == -1) {
            windowStatus = 'left=100, top=100, height=610, width=420, location=no, menubar=no, scrollbars=auto, status=no, titlebar=no, toolbar=no, resizable=no';
        }
        else {
            windowStatus = 'left=100, top=100, height=610, width=420, location=no, menubar=no, scrollbars=auto, status=no, titlebar=no, toolbar=no, resizable=no';
        }
        stdpaywin = window.open('', obj.name, windowStatus);

        obj.action = "/std/iaDirect.do";
        obj.method='POST';
        obj.target=obj.name;
        obj.submit();
    },svc_mobile : function(obj) {
        stdpaywin = window.open('', obj.name, '');
        setTimeout(function(){
            if (stdpaywin == null) {
                alert(Msg.dev_err1)
            }
        }, 1000)

        obj.action = "/std/iaDirect.do";
        obj.method='POST';
        obj.target=obj.name;
        obj.submit();
    }

}