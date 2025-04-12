
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="py-16 bg-age-teal text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">One stop solution for donations</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Curated list of genuine old age homes in Indore and resources for elderly care.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/article/old-age-homes-role">
            <Button className="bg-white text-age-teal hover:bg-gray-100">Learn About Old Age Homes</Button>
          </Link>
          <Link to="/article/senior-citizens-laws">
            <Button variant="outline" className="border-white text-white hover:bg-white/10">Senior Citizen Laws</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
