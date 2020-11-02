import DisappearHappy from "./DisappearHappy";

const {ccclass,property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component
{

    start()
    {
        new DisappearHappy();
        DisappearHappy.Get().Init();
    }

    update(dt)
    {
        DisappearHappy.Logic.Tick();
    }
}
