/// <reference path="VizAttribute.ts"/>
/// <reference path="VizElement.ts"/>
/// <reference path="VizStatement.ts"/>
/// <reference path="VizGraphKind.ts"/>
/// <reference path="VizNode.ts"/>
/// <reference path="VizNodeSettings.ts"/>
/// <reference path="VizArrowShapes.ts"/>
/// <reference path="VizHelpers.ts"/>

module VizTs {
    export class VizGraph {
        graphKind: VizGraphKind;
        name: string;
        
        nodeSettings: VizNodeSettings;
        
        statements: VizStatement[];

        private nextEdgeNumber = 0;

        constructor(graphKind: VizGraphKind, name: string) {
            this.name = name;
            this.graphKind = graphKind;
            this.nodeSettings = new VizNodeSettings();

            this.statements = [];
        }

        add(statement: VizStatement): void {
            if (statement)
                this.statements.push(statement);
        }

        node(name: string, label: string = null): VizNode {
            var node = new VizNode(name);
            if (label)
                node.label(label);
            this.add(node);
            return node;
        }

        edge(from: VizNode, to: VizNode, label: string = null, arrowHead: string = null, arrowTail: string = null, style: string = null, fontsize: number = null, headLabel: string = null, tailLabel: string = null): VizEdge {
            var edge = new VizEdge('__edge' + this.nextEdgeNumber++, from, to, label, arrowHead, arrowTail, style, fontsize, headLabel, tailLabel);
            this.add(edge);
            return edge;
        }

        toCode(): string {
            var buffer = [];
            buffer.push(this.graphKind, ' ', this.name, ' {', VizHelpers.newLine);
            buffer.push(this.nodeSettings.toCode());
            
            // TODO: implement exposed cluster/subgraph feature
            this.statements.forEach(s => buffer.push(s.toCode()));

            buffer.push('}');
            return buffer.join('');
        }
    }
}

