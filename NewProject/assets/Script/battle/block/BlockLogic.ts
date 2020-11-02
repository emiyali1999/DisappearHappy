import {BattleData,BlockType,GameStage,Vect2} from "../../BattleData";
import DisappearHappy from "../../DisappearHappy";
import Block from "./Block";

export class BlockLogic
{
    private arrMessage: Array<Array<Vect2>>;
    private arrLoopMessage: Array<Vect2>;
    private arrOffsetMap: Array<Array<number>>;

    constructor()
    {
    }

    private InitMessageArr(): void
    {
        this.arrMessage = [];
        this.arrOffsetMap = [];
        for(let i = 0;i < DisappearHappy.Logic.BattleData.Xsize;i++)
        {
            this.arrMessage[i] = [];
            this.arrOffsetMap[i] = [];
        }
        for(let i = 0;i < DisappearHappy.Logic.BattleData.Xsize;i++)
        {
            for(let j = 0;j < DisappearHappy.Logic.BattleData.Ysize;j++)
            {
                this.arrMessage[i][j] = new Vect2(i,j);
                this.arrOffsetMap[i][j] = 0;
            }
        }
        this.arrLoopMessage = [];
    }

    public Tick(): void
    {
        if(DisappearHappy.Logic.BattleData.m_stStage != GameStage.JUDGMENT)
        {
            return;
        }
        this.LogicJudgment();
        this.CalOffset();
        this.SetNewGridMap();
        for(let j = DisappearHappy.Logic.BattleData.Ysize - 1;j >= 0;j--)
        {
            let str = "";
            for(let i = 0;i < DisappearHappy.Logic.BattleData.Xsize;i++)
            {
                DisappearHappy.Logic.Render.ChangeRender(i,j,this.arrOffsetMap[i][j]);
                str += DisappearHappy.Logic.BattleData.m_arrBlockMap[i][j].m_stRot + " ";
            }
            //console.log(str);
        }
        DisappearHappy.Logic.BattleData.m_stStage = GameStage.MOVE;
    }

    private LogicJudgment(): void
    {
        this.InitMessageArr();
        for(let j = 0;j < DisappearHappy.Logic.BattleData.Ysize;j++)
        {
            for(let i = 0;i < DisappearHappy.Logic.BattleData.Xsize;i++)
            {
                let gird = DisappearHappy.Logic.BattleData.m_arrBlockMap[i][j];
                this.CalMessage(gird);
            }
        }
    }

    /**
     * 每一次操作重新计算一遍网格，从左往右从下到上
     * @param gird 
     */
    private CalMessage(gird: Block): void
    {
        switch(gird.m_stType)
        {
            case BlockType.BENT:
                {
                    switch(gird.m_stRot)
                    {
                        case 0:
                            {
                                break;
                            }
                        case 90:
                            {
                                let findconnent = false;
                                let grid1 = null;
                                if(gird.m_stPos.x - 1 >= 0)
                                {
                                    grid1 = this.FindRoot(new Vect2(gird.m_stPos.x - 1,gird.m_stPos.y));
                                }
                                if(grid1)
                                {
                                    if(DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stType == BlockType.BENT &&
                                        (DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stRot == 0
                                            || DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stRot == 270))
                                    {
                                        this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = grid1;
                                        findconnent = true;
                                    }

                                    if(DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stType == BlockType.STRAIGHT &&
                                        (DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stRot == 0
                                            || DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stRot == 180))
                                    {
                                        this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = grid1;
                                        findconnent = true;
                                    }
                                }
                                if(!findconnent) this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = gird.m_stPos;
                                break;
                            }
                        case 180:
                            {
                                //找左边是否能连到 ，连到的话root点坐标是多少
                                let findconnent1 = false;
                                let grid1: Vect2 = null;
                                if(gird.m_stPos.x - 1 >= 0)
                                {
                                    grid1 = this.FindRoot(new Vect2(gird.m_stPos.x - 1,gird.m_stPos.y));
                                }
                                if(grid1)
                                {
                                    if(DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stType == BlockType.BENT &&
                                        (DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stRot == 0
                                            || DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stRot == 270))
                                    {
                                        findconnent1 = true;
                                    }

                                    if(DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stType == BlockType.STRAIGHT &&
                                        (DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stRot == 0
                                            || DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stRot == 180))
                                    {
                                        findconnent1 = true;
                                    }
                                }
                                //找下面是否能连到 ，连到的话root点坐标是多少
                                let findconnent2 = false;
                                let grid2: Vect2 = null;
                                if(gird.m_stPos.y - 1 >= 0)
                                {
                                    grid2 = this.FindRoot(new Vect2(gird.m_stPos.x,gird.m_stPos.y - 1));
                                }
                                if(grid2)
                                {
                                    if(DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stType == BlockType.BENT &&
                                        (DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stRot == 0
                                            || DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stRot == 90))
                                    {
                                        findconnent2 = true;
                                    }

                                    if(DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stType == BlockType.STRAIGHT &&
                                        (DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stRot == 90
                                            || DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stRot == 270))
                                    {
                                        findconnent2 = true;
                                    }
                                }

                                //如果两边都没有
                                if(!findconnent1 && !findconnent2)
                                {
                                    this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = gird.m_stPos;
                                }
                                else if(findconnent1 && findconnent2)//如果都有
                                {
                                    //如果两端相同  把自己设为相同值  然后把root点加入标记队列
                                    if(grid1.x == grid2.x && grid1.y == grid2.y)
                                    {
                                        this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = grid1;
                                        this.arrLoopMessage.push(grid1);
                                    }
                                    else //否则 把左边块的root的root点由自己改为下面块的root点
                                    {
                                        this.arrMessage[grid1.x][grid1.y] = grid2;
                                        this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = grid2;
                                    }
                                }
                                else if(findconnent1 && !findconnent2)//如果只有左边
                                {
                                    this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = grid1;
                                }
                                else if(!findconnent1 && findconnent2)//如果只有下面
                                {
                                    this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = grid2;
                                }
                                break;
                            }
                        case 270:
                            {
                                let findconnent = false;
                                let grid1 = null;
                                if(gird.m_stPos.y - 1 >= 0)
                                {
                                    grid1 = this.FindRoot(new Vect2(gird.m_stPos.x,gird.m_stPos.y - 1));
                                }
                                if(grid1)
                                {
                                    if(DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stType == BlockType.BENT &&
                                        (DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stRot == 0
                                            || DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stRot == 90))
                                    {
                                        this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = grid1;
                                        findconnent = true;
                                    }

                                    if(DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stType == BlockType.STRAIGHT &&
                                        (DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stRot == 90
                                            || DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stRot == 270))
                                    {
                                        this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = grid1;
                                        findconnent = true;
                                    }
                                }
                                if(!findconnent) this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = gird.m_stPos;
                                break;
                            }
                    }
                    break;
                }
            case BlockType.STRAIGHT:
                {
                    switch(gird.m_stRot)
                    {
                        case 0:
                        case 180:
                            {
                                let findconnent = false;
                                let grid1: Vect2 = null;
                                if(gird.m_stPos.x - 1 >= 0)
                                {
                                    grid1 = this.FindRoot(new Vect2(gird.m_stPos.x - 1,gird.m_stPos.y));
                                }
                                if(grid1)
                                {
                                    if(DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stType == BlockType.BENT &&
                                        (DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stRot == 0
                                            || DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stRot == 270))
                                    {
                                        this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = grid1;
                                        findconnent = true;
                                    }

                                    if(DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stType == BlockType.STRAIGHT &&
                                        (DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stRot == 0
                                            || DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x - 1][gird.m_stPos.y].m_stRot == 180))
                                    {
                                        this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = grid1;
                                        findconnent = true;
                                    }
                                }
                                if(!findconnent)
                                {
                                    this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = gird.m_stPos;
                                }
                                break;
                            }

                        case 90:
                        case 270:
                            {
                                let findconnent = false;
                                let grid1: Vect2 = null;
                                if(gird.m_stPos.y - 1 >= 0)
                                {
                                    grid1 = this.FindRoot(new Vect2(gird.m_stPos.x,gird.m_stPos.y - 1));
                                }
                                if(grid1)
                                {
                                    if(DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stType == BlockType.BENT &&
                                        (DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stRot == 0
                                            || DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stRot == 90))
                                    {
                                        this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = grid1;
                                        findconnent = true;
                                    }

                                    if(DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stType == BlockType.STRAIGHT &&
                                        (DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stRot == 90
                                            || DisappearHappy.Logic.BattleData.m_arrBlockMap[gird.m_stPos.x][gird.m_stPos.y - 1].m_stRot == 270))
                                    {
                                        this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = grid1;
                                        findconnent = true;
                                    }
                                }
                                if(!findconnent)
                                {
                                    this.arrMessage[gird.m_stPos.x][gird.m_stPos.y] = gird.m_stPos;
                                }
                                break;
                            }

                    }
                }
        }
    }

    private FindRoot(v2: Vect2): Vect2
    {
        return this.arrMessage[v2.x][v2.y].x == v2.x && this.arrMessage[v2.x][v2.y].y == v2.y ? v2 : this.FindRoot(this.arrMessage[v2.x][v2.y]);
    }

    private CalOffset(): void
    {
        for(let i = 0;i < DisappearHappy.Logic.BattleData.Xsize;i++)
        {
            let offset = 0;
            let ysize = 0;
            for(let j = 0;j < DisappearHappy.Logic.BattleData.Ysize;j++)
            {
                if(this.IsGridConnect(this.arrMessage[i][j]))
                {
                    offset += 1;
                }
                else
                {
                    this.arrOffsetMap[i][ysize] = offset;
                    ysize++;
                }
            }
            for(let j = ysize;j < DisappearHappy.Logic.BattleData.Ysize;j++)
            {
                this.arrOffsetMap[i][j] = offset;
            }
        }
    }

    private SetNewGridMap(): void
    {
        let point = 0;
        for(let i = 0;i < DisappearHappy.Logic.BattleData.Xsize;i++)
        {
            let ysize = 0;
            for(let j = 0;j < DisappearHappy.Logic.BattleData.Ysize;j++)
            {
                if(this.IsGridConnect(this.arrMessage[i][j]))
                {
                    point += 1;
                }
                else
                {
                    DisappearHappy.Logic.BattleData.m_arrBlockMap[i][ysize] = DisappearHappy.Logic.BattleData.m_arrBlockMap[i][j];
                    DisappearHappy.Logic.BattleData.m_arrBlockMap[i][ysize].m_stPos = new Vect2(i,ysize);
                    ysize++;
                }
            }
            for(let j = ysize;j < DisappearHappy.Logic.BattleData.Ysize;j++)
            {
                let type = (Math.floor(Math.random() * 1.5) + 1) % 2;
                let rot = (Math.floor(Math.random() * 3.99) * (-90) + 360) % 360;
                let pos = new Vect2(i,j);
                DisappearHappy.Logic.BattleData.m_arrBlockMap[i][j] = new Block(type,rot,pos);
            }
        }
    }

    private IsGridConnect(v2: Vect2): boolean
    {
        for(let i = 0;i < this.arrLoopMessage.length;i++)
        {
            if(v2.x == this.arrLoopMessage[i].x && v2.y == this.arrLoopMessage[i].y)
            {
                return true;
            }
        }
        return false;
    }
}
