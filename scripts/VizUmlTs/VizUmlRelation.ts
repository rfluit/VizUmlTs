module VizUml {
	export class VizUmlRelation {
		private from: VizUmlType;
		private to: VizUmlType;
		private label: string;
		private arrowHead: string;
		private arrowTail: string;
		private style: string;
		private fontsize: number;

		private headLabel: string;
		private tailLabel: string;

		constructor(from: VizUmlType, to: VizUmlType, label: string = null, arrowHead: string = null, arrowTail: string = null, style: string = null, fontsize: number = null) {
			this.from = from;
			this.to = to;
			this.label = label;
			this.arrowHead = arrowHead;
			this.arrowTail = arrowTail;
			this.style = style;
			this.fontsize = fontsize;
		}

		fromLabel(label: string): void {
			this.headLabel = label;
		}

		toLabel(label: string): void {
			this.tailLabel = label;
		}

		addToGraph(graph: VizTs.VizGraph, nodes: VizTs.VizNode[]): void {
			graph.edge(nodes[this.from.name], nodes[this.to.name], this.label, this.arrowHead, this.arrowTail, this.style, this.fontsize, this.headLabel, this.tailLabel);
		}
	}
}