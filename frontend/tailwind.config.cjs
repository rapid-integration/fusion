/**@type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", { fontFeatureSettings: '"cv11"', }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--kb-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--kb-accordion-content-height)" },
          to: { height: 0 }
        },
        "content-show": {
          from: { opacity: 0, scale: 0 },
          to: { opacity: 1, scale: 1 }
        },
        "content-hide": {
          from: { opacity: 1, scale: 1 },
          to: { opacity: 0, scale: 0 }
        },
        "blink": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "content-show": "content-show 350ms cubic-bezier(0.25, 1.25, 0.5, 1)",
        "content-hide": "content-hide 300ms cubic-bezier(0.25, 0.75, 0.1, 1)",
        "blink": "blink 1s cubic-bezier(0.4, 0, 0.2, 1) infinite"
      }
    }
  },
  plugins: []
}
