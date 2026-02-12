import { Badge } from '@/components/ui/badge';
import { type UnifiedEvent } from '@/lib/data/unifiedEvents';

export function SpotRegistrationBadge({ event }: { event: UnifiedEvent }) {
    if (!event.spotRegistration) return;

    return (
        <div className="glass-surface rounded-xl p-4 border border-white/5 bg-white/[0.02]">
            <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    Spot Registration
                </span>

                <Badge className="bg-green-500/10 text-green-400 border-green-500/30 uppercase tracking-wide">
                    Available
                </Badge>

            </div>
        </div>
    );
}