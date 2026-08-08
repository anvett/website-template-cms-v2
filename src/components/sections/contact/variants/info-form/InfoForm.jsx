"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { siteData } from "@/data/global/site.data";

import { Card } from "@/components/ui/content/Card";
import { InfoItem } from "@/components/ui/content/InfoItem";
import { Button } from "@/components/ui/actions/Button";

import { Form } from "@/components/ui/form/Form";
import { FormField } from "@/components/ui/form/FormField";
import { Input } from "@/components/ui/form/Input";
import { Select } from "@/components/ui/form/Select";
import { Textarea } from "@/components/ui/form/Textarea";

import { MapEmbed } from "@/components/ui/media/MapEmbed";
import {
  resolveTone,
  getToneCssColor,
  resolveTypography,
  getTitleSizeCssValue,
  getDescriptionSizeCssValue,
} from "@/lib/sections/sectionStyle";

const surfaceClasses = {
  base: "bg-[var(--color-bg)] text-[var(--color-text)]",
  subtle: "bg-[var(--color-bg-soft)] text-[var(--color-text)]",
  strong: "bg-[var(--color-bg-dark)] text-[var(--color-text-inverse)]",
};

const gradientClasses = {
  brand: "gradient-dark",
  dark: "gradient-dark",
  soft: "gradient-soft",
  accent: "gradient-accent",
};

const containerClasses = {
  content:
    "mx-auto w-full max-w-[var(--container-width-content)] px-[var(--container-padding)]",
  section:
    "mx-auto w-full max-w-[var(--container-width)] px-[var(--container-padding)]",
  wide:
    "mx-auto w-full max-w-[var(--container-width-wide)] px-[var(--container-padding)]",
};

const spacingClasses = {
  compact: "py-[var(--section-spacing-compact)]",
  default: "py-[var(--section-spacing)]",
  hero: "py-[var(--section-spacing-hero)]",
};

function getBackgroundClasses(surface, background) {
  if (background?.type === "gradient") {
    return gradientClasses[background.variant] || gradientClasses.brand;
  }

  if (background?.type === "image") {
    return "relative overflow-hidden text-[var(--color-text-inverse)]";
  }

  return surfaceClasses[surface] || surfaceClasses.base;
}

function buildWhatsappMessage(values, intro) {
  return [
    intro || "Hola, quiero solicitar información.",
    "",
    `Nombre: ${values.name}`,
    `Teléfono: ${values.phone}`,
    values.email ? `Correo: ${values.email}` : null,
    `Tipo de solicitud: ${values.service}`,
    "",
    `Mensaje: ${values.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function InfoForm({ data }) {
  const {
    id,
    surface = "base",
    containerWidth = "section",
    spacing = "default",
    background = { type: "surface", variant: null },
    content = {},
    media = {},
    items = [],
    meta = {},
  } = data;

  const fields = meta?.form?.fields || [];
  const mapEmbed = meta?.mapEmbed || {};
  const whatsappIntro = meta?.form?.whatsappIntro;

  const overlayEnabled = meta?.overlay ?? media?.background?.overlay ?? true;
  const overlayOpacity = meta?.overlayOpacity ?? 0.7;
  const tone = resolveTone(data, { hasImage: background?.type === "image" });
  const { titleSize, descriptionSize } = resolveTypography(data);

  const contactInfo = {
    phone: siteData?.contact?.phone,
    whatsapp: siteData?.contact?.whatsapp,
    email: siteData?.contact?.email,
    address: siteData?.address?.fullAddress,
    schedule: siteData?.businessHours?.weekdays,
  };

  const whatsapp = siteData?.contact?.whatsapp || "";
  const [errors, setErrors] = useState({});
  const backgroundImage = media?.background?.src;

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const nextErrors = {};

    fields.forEach((field) => {
      if (field.required && !String(values[field.name] || "").trim()) {
        nextErrors[field.name] = "Este campo es obligatorio.";
      }
    });

    if (!whatsapp) {
      nextErrors.form =
        "No se ha configurado el número de WhatsApp en site.data.js.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const message = buildWhatsappMessage(values, whatsappIntro);
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  function renderField(field) {
    const commonProps = {
      id: field.name,
      name: field.name,
      required: field.required,
      placeholder: field.placeholder || field.label,
      invalid: Boolean(errors[field.name]),
    };

    if (field.type === "textarea") {
      return <Textarea {...commonProps} rows={5} />;
    }

    if (field.type === "select") {
      return (
        <Select
          {...commonProps}
          placeholder={field.placeholder || "Seleccione una opción"}
          options={field.options || []}
        />
      );
    }

    return <Input {...commonProps} type={field.type || "text"} />;
  }

  return (
    <section
      id={id}
      className={[
        getBackgroundClasses(surface, background),
        spacingClasses[spacing] || spacingClasses.default,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {background?.type === "image" && backgroundImage ? (
        <>
          <img
            src={backgroundImage}
            alt={media?.background?.alt || ""}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {overlayEnabled ? (
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: overlayOpacity }}
              aria-hidden="true"
            />
          ) : null}
        </>
      ) : null}

      <div
        className={[
          containerClasses[containerWidth] || containerClasses.section,
          "relative z-10 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4">
            {content.eyebrow ? (
              <span
                className="section-eyebrow"
                style={{ "--section-eyebrow-color": getToneCssColor(tone, "eyebrow") }}
              >
                {content.eyebrow}
              </span>
            ) : null}

            {content.title ? (
              <h2
                className="section-title"
                style={{
                  "--section-title-color": getToneCssColor(tone, "title"),
                  "--section-title-size": getTitleSizeCssValue(titleSize),
                }}
              >
                {content.title}
              </h2>
            ) : null}

            {content.description ? (
              <p
                className="section-description max-w-[42rem]"
                style={{
                  "--section-description-color": getToneCssColor(tone, "description"),
                  "--section-description-size": getDescriptionSizeCssValue(descriptionSize),
                }}
              >
                {content.description}
              </p>
            ) : null}
          </div>

          {items.length > 0 ? (
            <div className="grid gap-4">
              {items.map((item, index) => (
                <Card
                  key={item.title || index}
                  padding="md"
                  radius="lg"
                  shadow="sm"
                >
                  <InfoItem
                    title={item.title}
                    description={item.description}
                    showIcon={false}
                    size="md"
                  />
                </Card>
              ))}
            </div>
          ) : null}

          {mapEmbed?.src ? (
            <MapEmbed
              src={mapEmbed.src}
              title={mapEmbed.title || "Ubicación"}
              height={mapEmbed.height || "24rem"}
            />
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
            delay: 0.08,
          }}
          className="flex flex-col gap-6"
        >
          <Card padding="lg" radius="xl" shadow="md">
            <div className="flex flex-col gap-4">
              <h3 className="text-[1.25rem] font-bold text-[var(--color-primary)]">
                Información de contacto
              </h3>

              {contactInfo.phone ? (
                <InfoItem
                  title="Teléfono"
                  description={contactInfo.phone}
                  showIcon={false}
                />
              ) : null}

              {contactInfo.whatsapp ? (
                <InfoItem
                  title="WhatsApp"
                  description={contactInfo.whatsapp}
                  showIcon={false}
                />
              ) : null}

              {contactInfo.email ? (
                <InfoItem
                  title="Correo"
                  description={contactInfo.email}
                  showIcon={false}
                />
              ) : null}

              {contactInfo.address ? (
                <InfoItem
                  title="Dirección"
                  description={contactInfo.address}
                  showIcon={false}
                />
              ) : null}

              {contactInfo.schedule ? (
                <InfoItem
                  title="Horario"
                  description={contactInfo.schedule}
                  showIcon={false}
                />
              ) : null}
            </div>
          </Card>

          <Card padding="lg" radius="xl" shadow="md">
            <div className="mb-6 flex flex-col gap-2">
              <h3 className="text-[1.375rem] font-bold text-[var(--color-primary)]">
                Solicita asesoría personalizada
              </h3>

              <p className="text-[1rem] leading-[1.7] text-[var(--color-text-soft)]">
                Completa el formulario y te contactaremos por WhatsApp para
                ayudarte con tu solicitud.
              </p>
            </div>

            <Form onSubmit={handleSubmit}>
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  label={field.label}
                  htmlFor={field.name}
                  required={field.required}
                  error={errors[field.name]}
                >
                  {renderField(field)}
                </FormField>
              ))}

              {errors.form ? (
                <p className="text-[0.875rem] leading-[1.5] text-red-600">
                  {errors.form}
                </p>
              ) : null}

              <Button type="submit" variant="primary">
                Enviar por WhatsApp
              </Button>
            </Form>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default InfoForm;