import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isMobile(){
  return window.innerWidth < 720
}

export async function resolvePromise<T>(promise: Promise<T>): Promise<T> {
	await new Promise((resolve) => {
		setTimeout(resolve, 3000);
	});
	return await promise;
}

export const toastConfig={
  duration: 4000,
  position: 'top-center',

  // Styling
  style: {},
  className: '',

  // Custom Icon
  icon: '⌛',

  // Change colors of success/error/loading icon
  iconTheme: {
    primary: '#000',
    secondary: '#fff',
  },

  // Aria
  ariaProps: {
    role: 'status',
    'aria-live': 'polite',
  },
}