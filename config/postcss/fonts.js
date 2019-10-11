module.exports = {
	formats: 'local woff',
	display: "swap",
	custom: {
		"Circe": {
			variants: {
				normal: {
					400: {
						url: {
							woff: "../fonts/Circe-Regular.woff"
						}
					},
					700: {
						url: {
							woff: "../fonts/Circe-Bold.woff"
						}
					}
				}
			}
		}
	}
}