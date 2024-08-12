import { type ClassValue, clsx } from "clsx"
import { Blogs } from "contentlayer/generated";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// formatted date function (DD/MM/YYYY)

export const getFormattedDate = (publishedAt: string): string => {
  const now = new Date();
  const [day, month, year] = publishedAt.split("-").map(Number);
  const date = new Date(year, month - 1, day); // month is 0-indexed in JS Date

  const diffMilliseconds = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30.436875);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffYears >= 1) {
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  } else if (diffMonths >= 1) {
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  } else if (diffWeeks >= 1) {
    return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
  } else if (diffDays >= 1) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else {
    return "Today";
  }
};

// sort blogs by date
export function sortBlogsByDate(blogs: Blogs[]): Blogs[] {
  return blogs.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime(); // Sort in descending order (newest first)
  });
}