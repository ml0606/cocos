interface IEventData {
    func: Function;
    target: any;
}

interface IEvent {
    [eventName: string]: IEventData[];
}

export class EventManager {
    public static handle: IEvent = {};

    /**
     * 发送事件
     * @param eventName 事件名称
     * @param args 参数列表
     */
    public static emit(eventName: string, ...args: any) {
        const list = this.handle[eventName];
        if (!list || list.length <= 0) {
            return;
        }

        for (let i = 0; i < list.length; i++) {
            const event = list[i];
            event.func.apply(event.target, args);
        }
    }

    /**
     * 注册该事件一个回调函数
     * @param eventName 事件名称
     * @param callback 回调函数
     * @param target 调用对象
     */
    public static on(eventName: string, callback: Function, target?: any) {
        if (!this.handle[eventName]) {
            this.handle[eventName] = [];
        }

        const data: IEventData = {func: callback, target: target};
        this.handle[eventName].push(data);
    }

    /**
     * 注销该事件上的指定回调函数
     * @param eventName 事件名称
     * @param callback 回调函数
     * @param target 调用对象
     */
    public static off(eventName: string, callback: Function, target?: any) {
        const list = this.handle[eventName];
        if (!list || list.length <= 0) {
            return;
        }

        for (let i = 0; i < list.length; i++) {
            const event = list[i];
            if (event.func === callback && (!target || target === event.target)) {
                list.splice(i, 1);
                break;
            }
        }
    }
}
