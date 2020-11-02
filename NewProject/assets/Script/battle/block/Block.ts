import {Vect2,BlockType} from "../../BattleData";

export default class Block
{
    public m_stType: BlockType;
    public m_stRot: number = 0;//0,90,180,270
    public m_stPos: Vect2 = new Vect2(0,0);

    constructor(type: any,Rot: number,Pos: Vect2)
    {
        this.m_stType = type;
        this.m_stRot = Rot;
        this.m_stPos = Pos;
    }
}
