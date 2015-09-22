/// <reference path="VizStatement.ts"/>

module VizTs {
    export class VizEdge extends VizStatement {
        from: VizNode;
        to: VizNode;
        label: string;
        arrowHead: string;
        arrowTail: string;
		style: string;
		fontsize: number;

		headLabel: string;
		tailLabel: string;

        constructor(name: string, from: VizNode, to: VizNode, label: string = null, arrowHead: string = null, arrowTail: string = null, style: string = null, fontsize: number = null, headLabel: string = null, tailLabel: string = null) {
            super(name);
            this.from = from;
            this.to = to;
            this.label = label;
            this.arrowHead = arrowHead;
            this.arrowTail = arrowTail;
			this.style = style;
			this.fontsize = fontsize;

			this.headLabel = headLabel;
	        this.tailLabel = tailLabel;
        }

        toCode(): string {
            this.name = this.from.name + ' -> ' + this.to.name;
            this.attrNotNull('label', this.label);
            this.attrNotNull('arrowhead', this.arrowHead);
            this.attrNotNull('arrowtail', this.arrowTail);
            this.attrNotNull('style', this.style);
			if (this.fontsize !== null)
				this.attrNumber('fontsize', this.fontsize);
	        //this.attr('dir', 'forward');
			
			return super.toCode();
        }
    }
}