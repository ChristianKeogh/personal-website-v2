import type { Lesson } from "../lessons";
import LessonHook from "./lesson-hook";

interface LessonShellProps {
  lesson: Lesson;
  children: React.ReactNode;
}

export default function LessonShell({ lesson, children }: LessonShellProps) {
  return (
    <section
      id={lesson.slug}
      className="mt-16 pt-10 border-t border-neutral-900 scroll-mt-24"
    >
      <LessonHook slug={lesson.slug} />
      <h2 className="title font-medium text-2xl tracking-tight text-neutral-400">
        {lesson.title}
      </h2>
      <p className="mt-2 text-neutral-500">{lesson.idea}</p>
      {children}
    </section>
  );
}
