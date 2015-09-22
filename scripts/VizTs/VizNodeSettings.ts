module VizTs {
    export class VizNodeSettings extends VizElement {
        constructor() {
            super('node');
        }

        shape(value: string): void {
            this.attr('shape', value);
        }

        fontsize(value: number): void {
            this.attrNumber('fontsize', value);
        }

        rankdir(value: string): void {
            this.attr('rankdir', value);
        }

        margin(value: string): void {
            this.attr('margin', value);
        }

        pad(value: string): void {
            this.attr('pad', value);
        }

		toCode(): string {
			if (!this.hasAttributes())
				return '';
			return super.toCode();
		}
    }
}