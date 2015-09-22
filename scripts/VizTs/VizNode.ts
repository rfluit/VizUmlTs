module VizTs {
    export class VizNode extends VizStatement {
        subgraph: string;
        
        label(value: string): void {
            this.attr('label', value);
        }
    }
}