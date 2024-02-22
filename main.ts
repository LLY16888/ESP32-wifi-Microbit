//% blockId=WIFI_Camera block="WIFI Camera"
//%color="#228B22" weight=25 icon="\uf06e"
namespace WIFI_Camera {


    export enum MODE_selcet
    {
        //% blockId="APOnly" block="APOnly"
        APOnly = 0,
        //% blockId="STAOnly" block="STAOnly"
        STAOnly,
        //% blockId="AP_STA" block="AP_STA"
        AP_STA
    }

    //% block="init SerialPort|sendpin %TX|recvpin %RX|buadrate %buadrate"
    //% group="SET SerialPort"
    export function initialization (TX:SerialPin,RX:SerialPin,buadrate:BaudRate) {
        serial.redirect(
        TX,
        RX,
        buadrate
        )
    }

    //% blockId=setRXbuffSize block="Set RXbuffSize|size %size"
    //% weight=88
    //% blockGap=10
    //% group="SET SerialPort"
    export function setRXbuffSize(size:number)
    {
        serial.setRxBufferSize(size)
    }
    
    //% blockId=setTXbuffSize block="Set TXbuffSize|size %size"
    //% weight=88
    //% blockGap=10
    //% group="SET SerialPort"
    export function setTXbuffSize(size:number)
    {
        serial.setTxBufferSize(size)
    }

    //wifi模式配置
    //% blockId=setWifiMode block="Set Wifi Mode Selcet %mode"
    //% weight=88
    //% blockGap=10
    //% group="SET WIFI MODE"
    export function setWifiMode(mode:MODE_selcet)
    {
        switch (mode)
        {
            case MODE_selcet.APOnly: serial.writeString("wifi_mode:0"); break;
            case MODE_selcet.STAOnly:serial.writeString("wifi_mode:1"); break;
            case MODE_selcet.AP_STA: serial.writeString("wifi_mode:2"); break;
        }
        basic.pause(4000)
        serial.readString() //目的是为了清掉缓存

       
    }

    //wifi配置 sta模式

    //% blockId=setSTASSID block="set STA SSID|wifi name %SSID"
    //% weight=88
    //% blockGap=10
    //% group="SET STA WIFI"
    export function setSTASSID(SSID:string)
    {
        serial.writeString("sta_ssid:"+SSID)
        basic.pause(500) 
        serial.readString() //目的是为了清掉缓存
    }

    //% blockId=setSTAPD block="set STA PASSWord|wifi password %Password"
    //% weight=88
    //% blockGap=10
    //% group="SET STA WIFI"
    export function setSTAPD(Password:string)
    {
        serial.writeString("sta_pd:"+Password)
        basic.pause(4000)//等待重启成功
        serial.readString() //目的是为了清掉缓存
    }

    //wifi配置 ap模式

    //% blockId=setAPSSID block="set AP SSID|wifi name %SSID"
    //% weight=88
    //% blockGap=10
    //% group="SET AP WIFI"
    export function setAPSSID(SSID:string)
    {
        serial.writeString("ap_ssid:"+SSID)
        basic.pause(500)
        serial.readString() //目的是为了清掉缓存
    }

    //% blockId=setAPPD block="set AP PASSWord|wifi password %Password"
    //% weight=88
    //% blockGap=10
    //% group="SET AP WIFI"
    export function setAPPD(Password:string)
    {
        serial.writeString("ap_pd:"+Password)
        basic.pause(4000)
        serial.readString() //目的是为了清掉缓存
    }

    //% blockId=GET_AP_IP block=GET_AP_IP
    //% weight=88
    //% blockGap=10
    //% group="GET WIFI IP"
    export function GET_AP_IP():string
    {
        serial.writeString("ap_ip")
        return serial.readUntil(serial.delimiters(Delimiters.NewLine))
    }

    //% blockId=GET_STA_IP block=GET_STA_IP
    //% weight=88
    //% blockGap=10
    //% group="GET WIFI IP"
    export function GET_STA_IP():string
    {
        serial.writeString("sta_ip")
        return serial.readUntil(serial.delimiters(Delimiters.NewLine))
        
    }

    //% blockId=GET_Version block=GET_Version
    //% weight=88
    //% blockGap=10
    //% group="GET WIFI Version"
    export function GET_Version():string
    {
        serial.writeString("wifi_ver")
        return serial.readUntil(serial.delimiters(Delimiters.NewLine))
    }

     //% blockId=GET_controlData block=GET_Control_Data
    //% weight=88
    //% blockGap=10
    //% group="GET Data"
    export function GET_controlData():string
    {
        let buff
        buff = serial.readString()
        return buff
    }

}