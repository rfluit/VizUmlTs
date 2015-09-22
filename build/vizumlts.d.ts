declare module VizTs {
    class VizArrowShapes {
        static box: string;
        static lbox: string;
        static rbox: string;
        static obox: string;
        static olbox: string;
        static orbox: string;
        static crow: string;
        static lcrow: string;
        static rcrow: string;
        static diamond: string;
        static ldiamond: string;
        static rdiamond: string;
        static odiamond: string;
        static oldiamond: string;
        static ordiamond: string;
        static dot: string;
        static odot: string;
        static inv: string;
        static linv: string;
        static rinv: string;
        static oinv: string;
        static olinv: string;
        static orinv: string;
        static none: string;
        static normal: string;
        static lnormal: string;
        static rnormal: string;
        static onormal: string;
        static olnormal: string;
        static ornormal: string;
        static tee: string;
        static ltee: string;
        static rtee: string;
        static vee: string;
        static lvee: string;
        static rvee: string;
        static curve: string;
        static lcurve: string;
        static rcurve: string;
        static icurve: string;
        static licurve: string;
        static ricurve: string;
    }
}
declare module VizTs {
    class VizAttribute {
        name: string;
        value: string;
        constructor(name: string, value: string);
        toCode(): string;
    }
}
declare module VizTs {
    class VizElement {
        name: string;
        private attributes;
        constructor(name: string);
        attr(name: string, value: string): void;
        attrNotNull(name: string, value: string): void;
        attrNumber(name: string, value: number): void;
        hasAttributes(): boolean;
        toCode(): string;
    }
}
declare module VizTs {
    class VizStatement extends VizElement {
    }
}
declare module VizTs {
    class VizEdge extends VizStatement {
        from: VizNode;
        to: VizNode;
        label: string;
        arrowHead: string;
        arrowTail: string;
        style: string;
        fontsize: number;
        headLabel: string;
        tailLabel: string;
        constructor(name: string, from: VizNode, to: VizNode, label?: string, arrowHead?: string, arrowTail?: string, style?: string, fontsize?: number, headLabel?: string, tailLabel?: string);
        toCode(): string;
    }
}
declare module VizTs {
    class VizEdgeStyles {
        static solid: string;
        static dashed: string;
        static dotted: string;
        static bold: string;
    }
}
declare module VizTs {
    class VizGraphKind {
        static graph: string;
        static digraph: string;
    }
}
declare module VizTs {
    class VizNode extends VizStatement {
        subgraph: string;
        label(value: string): void;
    }
}
declare module VizTs {
    class VizNodeSettings extends VizElement {
        constructor();
        shape(value: string): void;
        fontsize(value: number): void;
        rankdir(value: string): void;
        margin(value: string): void;
        pad(value: string): void;
        toCode(): string;
    }
}
declare module VizTs {
    class VizHelpers {
        static newLine: string;
        static escapeAttributeString(text: string): string;
    }
}
declare module VizTs {
    class VizGraph {
        graphKind: VizGraphKind;
        name: string;
        nodeSettings: VizNodeSettings;
        statements: VizStatement[];
        private nextEdgeNumber;
        constructor(graphKind: VizGraphKind, name: string);
        add(statement: VizStatement): void;
        node(name: string, label?: string): VizNode;
        edge(from: VizNode, to: VizNode, label?: string, arrowHead?: string, arrowTail?: string, style?: string, fontsize?: number, headLabel?: string, tailLabel?: string): VizEdge;
        toCode(): string;
    }
}
declare module VizUml {
    class VizUmlGraph {
        private name;
        private types;
        private relations;
        private nextNodeNumber;
        constructor(name: string);
        addClass(name: string, tag?: any): VizUmlType;
        addInterface(name: string, tag?: any): VizUmlType;
        isA(child: VizUmlType, parent: VizUmlType): VizUmlRelation;
        implements(subject: VizUmlType, abstraction: VizUmlType): VizUmlRelation;
        uses(subject: VizUmlType, uses: VizUmlType): VizUmlRelation;
        association(subject: VizUmlType, associatesWith: VizUmlType, subjectLabel?: string, associatedWithLabel?: string): VizUmlRelation;
        private addRelation(from, to, label?, arrowHead?, arrowTail?, style?, fontsize?);
        toCode(): string;
    }
    class VizUmlType {
        name: string;
        label: string;
        tag: any;
        style: string;
        constructor(name: string, label: string, tag: any);
        addToGraph(graph: VizTs.VizGraph): VizTs.VizNode;
    }
}
declare module VizUml {
    class VizUmlRelation {
        private from;
        private to;
        private label;
        private arrowHead;
        private arrowTail;
        private style;
        private fontsize;
        private headLabel;
        private tailLabel;
        constructor(from: VizUmlType, to: VizUmlType, label?: string, arrowHead?: string, arrowTail?: string, style?: string, fontsize?: number);
        fromLabel(label: string): void;
        toLabel(label: string): void;
        addToGraph(graph: VizTs.VizGraph, nodes: VizTs.VizNode[]): void;
    }
}
