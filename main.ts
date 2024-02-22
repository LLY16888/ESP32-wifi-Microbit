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

    //% block="init_SerialPort|sendpin %TX|recvpin %RX|buadrate %buadrate"
    //% group="SET SerialPort"
    export function initialization (TX:SerialPin,RX:SerialPin,buadrate:BaudRate) {
        serial.redirect(
        TX,
        RX,
        buadrate
        )
    }

    //% blockId=setRXbuffSize block="SetRXbuffSize|size %size"
    //% weight=88
    //% blockGap=10
    //% group="SET SerialPort"
    export function setRXbuffSize(size:number)
    {
        serial.setRxBufferSize(size)
    }
    
    //% blockId=setTXbuffSize block="SetTXbuffSize |size %size"
    //% weight=88
    //% blockGap=10
    //% group="SET SerialPort"
    export function setTXbuffSize(size:number)
    {
        serial.setTxBufferSize(size)
    }

    //wifi模式配置
    //% blockId=setWifiMode block="setWifiMode|MODE Selcet %mode"
    //% weight=88
    //% blockGap=10
    //% group="SET WIFI MODE"
    export function setWifiMode(mode:MODE_selcet)
    {
        switch (mode)
        {
            case MODE_selcet.APOnly: serial.writeLine("wifi_mode:0"); break;
            case MODE_selcet.STAOnly:serial.writeLine("wifi_mode:1"); break;
            case MODE_selcet.AP_STA: serial.writeLine("wifi_mode:2"); break;
        }
        basic.pause(2000)
       
    }

    //wifi配置 sta模式

    //% blockId=setSTASSID block="setSTASSID|wifi name %SSID"
    //% weight=88
    //% blockGap=10
    //% group="SET STA WIFI"
    export function setSTASSID(SSID:string)
    {
        serial.writeLine(SSID)
        basic.pause(200) //等待重启成功
    }

    //% blockId=setSTAPD block="setSTAPD|wifi password %Password"
    //% weight=88
    //% blockGap=10
    //% group="SET STA WIFI"
    export function setSTAPD(Password:string)
    {
        serial.writeLine(Password)
        basic.pause(2000)
    }

    //wifi配置 ap模式

    //% blockId=setAPSSID block="setAPSSID|wifi name %SSID"
    //% weight=88
    //% blockGap=10
    //% group="SET AP WIFI"
    export function setAPSSID(SSID:string)
    {
        serial.writeLine(SSID)
        basic.pause(200)
    }

    //% blockId=setAPPD block="setAPPD|wifi password %Password"
    //% weight=88
    //% blockGap=10
    //% group="SET AP WIFI"
    export function setAPPD(Password:string)
    {
        serial.writeLine(Password)
        basic.pause(2000)
    }

    //% blockId=GET_AP_IP block=GET_AP_IP
    //% weight=88
    //% blockGap=10
    //% group="GET WIFI IP"
    export function GET_AP_IP():string
    {
        serial.writeLine("ap_ip")
        return serial.readUntil(serial.delimiters(Delimiters.NewLine))

    }

    //% blockId=GET_STA_IP block=GET_STA_IP
    //% weight=88
    //% blockGap=10
    //% group="GET WIFI IP"
    export function GET_STA_IP():string
    {
        serial.writeLine("sta_ip")
        return serial.readUntil(serial.delimiters(Delimiters.NewLine))
        
    }

    //% blockId=GET_Version block=GET_Version
    //% weight=88
    //% blockGap=10
    //% group="GET WIFI Version"
    export function GET_Version():string
    {
        serial.writeLine("wifi_ver")
        return serial.readUntil(serial.delimiters(Delimiters.NewLine))
    }

}