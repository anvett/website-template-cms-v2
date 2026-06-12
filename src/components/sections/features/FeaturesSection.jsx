"use client";

import { motion } from "framer-motion";
import { FeaturesProcessSteps } from "./variants/process-steps/FeaturesProcessSteps";
import { FeaturesTwoColumnsGradientImage } from "./variants/two-columns-gradient-image/FeaturesTwoColumnsGradientImage";

import {
  BadgeCheck,
  Gauge,
  Handshake,
  Lightbulb,
  Shield,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";

const iconMap = {
  BadgeCheck,
  Gauge,
  Handshake,
  Lightbulb,
  Shield,
  ShieldCheck,
  Wrench,
  Zap,
};

export function FeaturesSection({ data }) {
  if (!data?.enabled) return null;
  if (data.variant === "two-columns-gradient-image") {
    return <FeaturesTwoColumnsGradientImage data={data} />;
  }

  if (data.variant === "process-steps") {
    return <FeaturesProcessSteps data={data} />;
  }

  const { id, content, items = [] } = data;

  return (
    <section
      id={id}
      className="section-shell gradient-soft-inverse"
      style={{
        "--section-eyebrow-color": "var(--color-primary)",
      }}
    >
      <div className="section-container">
        <div className="section-header">
          {content?.eyebrow && (
            <p className="section-eyebrow">{content.eyebrow}</p>
          )}

          {content?.title && <h2 className="section-title">{content.title}</h2>}

          {content?.description && (
            <p className="section-description">{content.description}</p>
          )}
        </div>

        <div className="section-grid section-grid--2">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <motion.article
                key={item.title}
                className="section-card text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
              >
                {Icon && (
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--color-text-inverse)]">
                    <Icon size="2.25rem" strokeWidth={2.0} />
                  </div>
                )}

                <h3 className="section-card-title">{item.title}</h3>

                {item.description && (
                  <p className="section-card-text">{item.description}</p>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
