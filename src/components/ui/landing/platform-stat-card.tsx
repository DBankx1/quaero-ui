import { Card, CardContent } from "~/components/ui/card";

interface Props {
  footerText: string;
  content: string;
}

function PlatformStatCard({ footerText, content }: Readonly<Props>) {
  return (
    <Card className="w-60 p-6">
      <CardContent>
        <h3 className="text-center text-3xl font-bold">{content}</h3>
        <div className="my-2 items-center justify-center text-center text-xs font-bold uppercase sm:flex-col">
          <span>{footerText}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default PlatformStatCard;
