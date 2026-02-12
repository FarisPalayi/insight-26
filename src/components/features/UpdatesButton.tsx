import { Bell } from "lucide-react";
import { Link, useLocation } from "react-router";

export const UpdatesButton = ({ hasUnread, }: { hasUnread: boolean; }) => {
    const location = useLocation();
    const isActive = location.pathname === "/updates";

    return (
        <Link
            to="/updates"
            aria-label="Updates"
            className={`
                relative
                inline-flex
                items-center
                justify-center
                h-10 w-10
                rounded-full
                transition-colors
                ${isActive
                    ? "text-primary bg-muted/50"
                    : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                }
            `}
        >
            <Bell className="h-5 w-5" />

            {/* Unread indicator */}
            {hasUnread && !isActive && (
                <span
                    className="
            absolute
            top-2 right-2
            h-2 w-2
            rounded-full
            bg-primary
          "
                    aria-hidden
                />
            )}
        </Link>
    );
};