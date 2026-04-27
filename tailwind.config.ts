
import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1200px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				ink: 'hsl(var(--ink))',
				paper: 'hsl(var(--paper))',
				'deep-blue': 'hsl(var(--deep-blue))',
				warm: 'hsl(var(--warm))',
				/* TCD Intelligence palette */
				'bb-off-white': 'hsl(var(--bb-off-white))',
				'bb-near-black': 'hsl(var(--bb-near-black))',
				'bb-slate': 'hsl(var(--bb-slate))',
				'bb-copper': 'hsl(var(--bb-copper))',
				'bb-gray': 'hsl(var(--bb-gray))',
				'bb-border': 'hsl(var(--bb-border))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(8px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(12px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				shimmer: {
					'100%': { transform: 'translateX(100%)' }
				},
				'reveal-up': {
					'0%': { opacity: '0', transform: 'translateY(24px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'reveal-down': {
					'0%': { opacity: '0', transform: 'translateY(-24px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'reveal-left': {
					'0%': { opacity: '0', transform: 'translateX(24px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'reveal-right': {
					'0%': { opacity: '0', transform: 'translateX(-24px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'reveal-scale': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'slide-in': 'slide-in-right 0.4s ease-out',
				shimmer: 'shimmer 1.5s infinite',
				'reveal-up': 'reveal-up 0.6s ease-out forwards',
				'reveal-down': 'reveal-down 0.6s ease-out forwards',
				'reveal-left': 'reveal-left 0.6s ease-out forwards',
				'reveal-right': 'reveal-right 0.6s ease-out forwards',
				'reveal-scale': 'reveal-scale 0.5s ease-out forwards'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				heading: ['Inter', 'system-ui', 'sans-serif'],
				logo: ['Inter', 'system-ui', 'sans-serif'],
				serif: ['Playfair Display', 'Georgia', 'serif']
			},
			transitionTimingFunction: {
				'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
			},
			boxShadow: {
				'hover': '0 4px 12px -2px rgba(0, 0, 0, 0.05)',
				'hover-md': '0 6px 16px -4px rgba(0, 0, 0, 0.08)',
				'hover-lg': '0 8px 24px -6px rgba(0, 0, 0, 0.1)',
				'button': '0 2px 8px -2px rgba(0, 0, 0, 0.08)',
				'button-hover': '0 4px 12px -3px rgba(0, 0, 0, 0.12)',
				'card-hover': '0 8px 20px -8px rgba(0, 0, 0, 0.08)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
