module VizUml {
	export class VizUmlGraph {
		private name: string;
		private types: VizUmlType[];
		private relations: VizUmlRelation[];
		private nextNodeNumber: number = 0;

		constructor(name: string) {
			this.name = name;
			this.types = [];
			this.relations = [];
		}

		addClass(name: string, tag: any = null): VizUmlType {
			var type = new VizUmlType('__node' + this.nextNodeNumber++, name, tag);
			this.types.push(type);
			return type;
		}

		addInterface(name: string, tag: any = null): VizUmlType {
			// TODO: different rendering
			var type = new VizUmlType('__node' + this.nextNodeNumber++, name, tag);
			this.types.push(type);
			return type;
		}

		// generalization
		isA(child: VizUmlType, parent: VizUmlType): VizUmlRelation {
			return this.addRelation(child, parent, 'is a', VizTs.VizArrowShapes.onormal, null, VizTs.VizEdgeStyles.solid);
		}

		// realization
		implements(subject: VizUmlType, abstraction: VizUmlType): VizUmlRelation {
			return this.addRelation(subject, abstraction, 'implements', VizTs.VizArrowShapes.onormal, null, VizTs.VizEdgeStyles.dashed);
		}

		// dependency
		uses(subject: VizUmlType, uses: VizUmlType): VizUmlRelation {
			return this.addRelation(subject, uses, '<<uses>>', VizTs.VizArrowShapes.vee, null, VizTs.VizEdgeStyles.dashed);
		}

		// Association
		association(subject: VizUmlType, associatesWith: VizUmlType, subjectLabel: string = null, associatedWithLabel: string = null): VizUmlRelation {
			var relation = this.addRelation(subject, associatesWith, null, VizTs.VizArrowShapes.vee, null, VizTs.VizEdgeStyles.dashed);
			relation.fromLabel(subjectLabel);
			relation.toLabel(associatedWithLabel);
			return relation;
		}

		private addRelation(from: VizUmlType, to: VizUmlType, label: string = null, arrowHead: string = null, arrowTail: string = null, style: string = null, fontsize: number = null): VizUmlRelation {
			var relation = new VizUmlRelation(from, to, label, arrowHead, arrowTail, style, fontsize);
			this.relations.push(relation);
			return relation;
		}

		toCode(): string {
			var graph = new VizTs.VizGraph(VizTs.VizGraphKind.digraph, this.name);
			graph.nodeSettings.shape("box");
			//graph.nodeSettings.rankdir("BT");

			var nodes = new Array<VizTs.VizNode>();
			for (var key in this.types) {
				var type = this.types[key];
				nodes[type.name] = type.addToGraph(graph);
			}

			for (var key in this.relations) {
				var relation = this.relations[key];
				relation.addToGraph(graph, nodes);
			}

			return graph.toCode();
		}
	}

	export class VizUmlType {
		name: string;
		label: string;
		tag: any; // Free usage object storage for association

		style: string;

		// TODO: implement methods and properties
		/*
        methods: VizUmlMethod[];
        properties: VizUmlProperty[];
        export class VizUmlMethod {
        
        }

        export class VizUmlProperty {
            type: string;
            name: string;
            visibility:
        }

        export class VizUmlVisibility {
            static pub: number = 1;
        }*/


		constructor(name: string, label: string, tag: any) {
			this.name = name;
			this.label = label;
			this.tag = tag;
		}

		addToGraph(graph: VizTs.VizGraph): VizTs.VizNode {
			var node = graph.node(this.name, this.label);
			if (this.style)
				node.attr('style', this.style);
			return node;
		}
	}
}