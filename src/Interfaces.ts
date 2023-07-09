export interface INote {
    id: number;
    top: number;
    left: number;
    height: number;
    width: number;
    isDeleted: boolean;
    description: string;
    background: string;
    layer: number;
}