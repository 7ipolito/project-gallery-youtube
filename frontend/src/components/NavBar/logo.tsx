import useTheme from '@/hooks/useTheme';
import { useEffect } from 'react';

interface LogoProps {
  imagePath: string;
}
export const Logo = ({ imagePath }: LogoProps) => {
  return (
    <img className="rounded-lg" src={imagePath} width={48} height={48} loading="lazy" alt="Gallery Youtube Logo" />
  );
};
