import { useEffect } from "react";
import Main from "@/components/layout/Main";
import { useLoaderData } from "react-router";
import type { Update } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/* ============================================
   Global seen logic (timestamp-based)
============================================ */

const STORAGE_KEY = "updates:lastSeenAt";

function getLastSeenAt(): number {
    if (typeof window === "undefined") return 0;
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? Number(value) : 0;
}

function markUpdatesAsSeen() {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    window.dispatchEvent(new Event("updates:seen"));
}

export function Updates() {
    const updates = useLoaderData() as Update[];
    const lastSeenAt = getLastSeenAt();

    const isUnseen = (createdAtSeconds: number) =>
        createdAtSeconds * 1000 > lastSeenAt;

    // Mark everything as seen when visiting this page
    useEffect(() => {
        markUpdatesAsSeen();
    }, []);

    return (
        <div className="min-h-screen bg-background dark">
            <Main>
                {/* Header */}
                <header className="mx-auto max-w-2xl px-4 pt-6 pb-8 sm:px-0 sm:pt-10 sm:pb-12">
                    <h1 className="text-2xl font-medium tracking-tight sm:text-4xl">
                        Updates
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                        Event announcements and important updates.
                    </p>
                </header>

                {/* Updates */}
                <section className="mx-auto max-w-2xl px-4 sm:px-0">
                    {updates.length === 0 ? (
                        <p className="py-10 text-sm text-muted-foreground">
                            No updates available.
                        </p>
                    ) : (
                        <ul className="space-y-10 sm:space-y-12">
                            {updates.map((update, index) => {
                                const unseen = isUnseen(update.createdAt.seconds);

                                return (
                                    <li key={update.id}>
                                        {/* Meta */}
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground sm:text-sm">
                                            <time>
                                                {new Date(
                                                    update.createdAt.seconds * 1000
                                                ).toLocaleDateString(undefined, {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </time>

                                            {update.type === "important" && (
                                                <Badge
                                                    variant="secondary"
                                                    className="px-2 py-0.5 text-[11px] bg-muted text-foreground"
                                                >
                                                    Important
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h2
                                            className={`
                        mt-2 flex items-center gap-2 text-base font-medium sm:text-lg
                        ${unseen ? "text-foreground" : "text-muted-foreground"}
                      `}
                                        >
                                            {update.title}

                                            {unseen && (
                                                <span
                                                    className="h-2 w-2 rounded-full bg-primary"
                                                    aria-label="Unread update"
                                                />
                                            )}
                                        </h2>

                                        {/* Body */}
                                        <p
                                            className={`
                        mt-2 max-w-prose text-sm leading-relaxed
                        ${unseen ? "text-muted-foreground" : "text-muted-foreground/70"}
                      `}
                                        >
                                            {update.body}
                                        </p>

                                        {index !== updates.length - 1 && (
                                            <Separator className="mt-6 sm:mt-8" />
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </section>
            </Main>
        </div>
    );
}