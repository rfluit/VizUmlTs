module VizTs {
	export class VizHelpers {
		public static newLine: string = '\r\n';

		static escapeAttributeString(text: string): string {
			if (text == null)
				return null;

			return text
				.replace(/\\/g, '\\\\')
				.replace(/"/g, '\\"')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');
		}
	}
}