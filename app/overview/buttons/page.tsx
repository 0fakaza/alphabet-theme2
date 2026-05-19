import {
  HugeiconsIcon,
  ArrowRight01Icon,
  Search01Icon,
  PlusSignCircleIcon,
  Notification02Icon,
  UserCircleIcon,
  Award01Icon,
  GiftIcon,
} from "@/lib/icons"

import {
  Button,
  ButtonLink,
  IconButton,
  IconButtonLink,
} from "@/components/elements/button"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 mt-12 text-2xl font-bold text-text-title first:mt-0">
      {children}
    </h2>
  )
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wider text-text-subtitle first:mt-0">
      {children}
    </h3>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>
}

export default function ButtonsOverviewPage() {
  return (
    <div className="container py-12">
      <h1 className="mb-2 text-3xl font-bold text-text-title">
        Button Components
      </h1>
      <p className="mb-10 text-text-subtitle">
        Projede kullanilan tum buton varyantlari ve kullanim ornekleri.
      </p>

      {/* ================================================================ */}
      {/* BUTTONS MEDIUM (md) */}
      {/* ================================================================ */}
      <SectionTitle>Buttons Medium</SectionTitle>

      <SubTitle>Primary</SubTitle>
      <Row>
        <Button
          variant="primary"
          size="md"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
          iconRight={<HugeiconsIcon icon={ArrowRight01Icon} />}
        >
          Name
        </Button>
        <Button
          variant="primary"
          size="md"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
        >
          Name
        </Button>
        <Button
          variant="primary"
          size="md"
          iconRight={<HugeiconsIcon icon={ArrowRight01Icon} />}
        >
          Name
        </Button>
        <Button variant="primary" size="md">
          Name
        </Button>
        <Button variant="primary" size="md" disabled>
          Name
        </Button>
      </Row>

      <SubTitle>Secondary</SubTitle>
      <Row>
        <Button
          variant="secondary"
          size="md"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
          iconRight={<HugeiconsIcon icon={ArrowRight01Icon} />}
        >
          Name
        </Button>
        <Button
          variant="secondary"
          size="md"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
        >
          Name
        </Button>
        <Button
          variant="secondary"
          size="md"
          iconRight={<HugeiconsIcon icon={ArrowRight01Icon} />}
        >
          Name
        </Button>
        <Button variant="secondary" size="md">
          Name
        </Button>
        <Button variant="secondary" size="md" disabled>
          Name
        </Button>
      </Row>

      <SubTitle>Tertiary</SubTitle>
      <Row>
        <Button
          variant="tertiary"
          size="md"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
          iconRight={<HugeiconsIcon icon={ArrowRight01Icon} />}
        >
          Name
        </Button>
        <Button
          variant="tertiary"
          size="md"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
        >
          Name
        </Button>
        <Button
          variant="tertiary"
          size="md"
          iconRight={<HugeiconsIcon icon={ArrowRight01Icon} />}
        >
          Name
        </Button>
        <Button variant="tertiary" size="md">
          Name
        </Button>
        <Button variant="tertiary" size="md" disabled>
          Name
        </Button>
      </Row>

      <SubTitle>Outline</SubTitle>
      <Row>
        <Button
          variant="outline"
          size="md"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
          iconRight={<HugeiconsIcon icon={ArrowRight01Icon} />}
        >
          Name
        </Button>
        <Button
          variant="outline"
          size="md"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
        >
          Name
        </Button>
        <Button
          variant="outline"
          size="md"
          iconRight={<HugeiconsIcon icon={ArrowRight01Icon} />}
        >
          Name
        </Button>
        <Button variant="outline" size="md">
          Name
        </Button>
        <Button variant="outline" size="md" disabled>
          Name
        </Button>
      </Row>

      <SubTitle>Ghost</SubTitle>
      <Row>
        <Button
          variant="ghost"
          size="md"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
          iconRight={<HugeiconsIcon icon={ArrowRight01Icon} />}
        >
          Name
        </Button>
        <Button
          variant="ghost"
          size="md"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
        >
          Name
        </Button>
        <Button variant="ghost" size="md">
          Name
        </Button>
        <Button variant="ghost" size="md" disabled>
          Name
        </Button>
      </Row>

      <SubTitle>Link</SubTitle>
      <Row>
        <Button variant="link">Name</Button>
        <ButtonLink variant="link" href="#">
          Name
        </ButtonLink>
        <Button variant="link" disabled>
          Name
        </Button>
      </Row>

      {/* ================================================================ */}
      {/* BUTTONS SMALL (sm) */}
      {/* ================================================================ */}
      <SectionTitle>Buttons Small</SectionTitle>

      <SubTitle>Primary</SubTitle>
      <Row>
        <Button
          variant="primary"
          size="sm"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
          iconRight={<HugeiconsIcon icon={ArrowRight01Icon} />}
        >
          Name
        </Button>
        <Button
          variant="primary"
          size="sm"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
        >
          Name
        </Button>
        <Button variant="primary" size="sm">
          Name
        </Button>
        <Button variant="primary" size="sm" disabled>
          Name
        </Button>
      </Row>

      <SubTitle>Secondary</SubTitle>
      <Row>
        <Button
          variant="secondary"
          size="sm"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
          iconRight={<HugeiconsIcon icon={ArrowRight01Icon} />}
        >
          Name
        </Button>
        <Button
          variant="secondary"
          size="sm"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
        >
          Name
        </Button>
        <Button variant="secondary" size="sm">
          Name
        </Button>
        <Button variant="secondary" size="sm" disabled>
          Name
        </Button>
      </Row>

      <SubTitle>Tertiary</SubTitle>
      <Row>
        <Button
          variant="tertiary"
          size="sm"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
          iconRight={<HugeiconsIcon icon={ArrowRight01Icon} />}
        >
          Name
        </Button>
        <Button
          variant="tertiary"
          size="sm"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
        >
          Name
        </Button>
        <Button variant="tertiary" size="sm">
          Name
        </Button>
        <Button variant="tertiary" size="sm" disabled>
          Name
        </Button>
      </Row>

      <SubTitle>Outline</SubTitle>
      <Row>
        <Button
          variant="outline"
          size="sm"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
          iconRight={<HugeiconsIcon icon={ArrowRight01Icon} />}
        >
          Name
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
        >
          Name
        </Button>
        <Button variant="outline" size="sm">
          Name
        </Button>
        <Button variant="outline" size="sm" disabled>
          Name
        </Button>
      </Row>

      <SubTitle>Ghost</SubTitle>
      <Row>
        <Button
          variant="ghost"
          size="sm"
          iconLeft={<HugeiconsIcon icon={Search01Icon} />}
        >
          Name
        </Button>
        <Button variant="ghost" size="sm">
          Name
        </Button>
        <Button variant="ghost" size="sm" disabled>
          Name
        </Button>
      </Row>

      {/* ================================================================ */}
      {/* ICON BUTTONS (md) */}
      {/* ================================================================ */}
      <SectionTitle>Button Icon</SectionTitle>

      <SubTitle>Primary</SubTitle>
      <Row>
        <IconButton
          variant="primary"
          size="md"
          icon={<HugeiconsIcon icon={Search01Icon} />}
        />
        <IconButton
          variant="primary"
          size="md"
          icon={<HugeiconsIcon icon={Notification02Icon} />}
        />
        <IconButton
          variant="primary"
          size="md"
          icon={<HugeiconsIcon icon={PlusSignCircleIcon} />}
        />
        <IconButton
          variant="primary"
          size="md"
          icon={<HugeiconsIcon icon={UserCircleIcon} />}
          disabled
        />
      </Row>

      <SubTitle>Secondary</SubTitle>
      <Row>
        <IconButton
          variant="secondary"
          size="md"
          icon={<HugeiconsIcon icon={Search01Icon} />}
        />
        <IconButton
          variant="secondary"
          size="md"
          icon={<HugeiconsIcon icon={Notification02Icon} />}
        />
        <IconButton
          variant="secondary"
          size="md"
          icon={<HugeiconsIcon icon={PlusSignCircleIcon} />}
        />
        <IconButton
          variant="secondary"
          size="md"
          icon={<HugeiconsIcon icon={UserCircleIcon} />}
          disabled
        />
      </Row>

      <SubTitle>Tertiary</SubTitle>
      <Row>
        <IconButton
          variant="tertiary"
          size="md"
          icon={<HugeiconsIcon icon={Search01Icon} />}
        />
        <IconButton
          variant="tertiary"
          size="md"
          icon={<HugeiconsIcon icon={Notification02Icon} />}
        />
        <IconButton
          variant="tertiary"
          size="md"
          icon={<HugeiconsIcon icon={PlusSignCircleIcon} />}
          disabled
        />
      </Row>

      <SubTitle>Outline</SubTitle>
      <Row>
        <IconButton
          variant="outline"
          size="md"
          icon={<HugeiconsIcon icon={Search01Icon} />}
        />
        <IconButton
          variant="outline"
          size="md"
          icon={<HugeiconsIcon icon={Notification02Icon} />}
        />
        <IconButton
          variant="outline"
          size="md"
          icon={<HugeiconsIcon icon={PlusSignCircleIcon} />}
          disabled
        />
      </Row>

      {/* ================================================================ */}
      {/* ICON BUTTONS SMALL (sm) */}
      {/* ================================================================ */}
      <SectionTitle>Button Icon Small</SectionTitle>

      <SubTitle>Primary</SubTitle>
      <Row>
        <IconButton
          variant="primary"
          size="sm"
          icon={<HugeiconsIcon icon={Search01Icon} />}
        />
        <IconButton
          variant="primary"
          size="sm"
          icon={<HugeiconsIcon icon={Notification02Icon} />}
        />
        <IconButton
          variant="primary"
          size="sm"
          icon={<HugeiconsIcon icon={PlusSignCircleIcon} />}
        />
        <IconButton
          variant="primary"
          size="sm"
          icon={<HugeiconsIcon icon={UserCircleIcon} />}
          disabled
        />
      </Row>

      <SubTitle>Secondary</SubTitle>
      <Row>
        <IconButton
          variant="secondary"
          size="sm"
          icon={<HugeiconsIcon icon={Search01Icon} />}
        />
        <IconButton
          variant="secondary"
          size="sm"
          icon={<HugeiconsIcon icon={Notification02Icon} />}
        />
        <IconButton
          variant="secondary"
          size="sm"
          icon={<HugeiconsIcon icon={PlusSignCircleIcon} />}
        />
        <IconButton
          variant="secondary"
          size="sm"
          icon={<HugeiconsIcon icon={UserCircleIcon} />}
          disabled
        />
      </Row>

      <SubTitle>Tertiary</SubTitle>
      <Row>
        <IconButton
          variant="tertiary"
          size="sm"
          icon={<HugeiconsIcon icon={Search01Icon} />}
        />
        <IconButton
          variant="tertiary"
          size="sm"
          icon={<HugeiconsIcon icon={Notification02Icon} />}
        />
        <IconButton
          variant="tertiary"
          size="sm"
          icon={<HugeiconsIcon icon={PlusSignCircleIcon} />}
          disabled
        />
      </Row>

      <SubTitle>Outline</SubTitle>
      <Row>
        <IconButton
          variant="outline"
          size="sm"
          icon={<HugeiconsIcon icon={Search01Icon} />}
        />
        <IconButton
          variant="outline"
          size="sm"
          icon={<HugeiconsIcon icon={Notification02Icon} />}
        />
        <IconButton
          variant="outline"
          size="sm"
          icon={<HugeiconsIcon icon={PlusSignCircleIcon} />}
          disabled
        />
      </Row>

      {/* ================================================================ */}
      {/* BUTTON LINK VARIANTS */}
      {/* ================================================================ */}
      <SectionTitle>ButtonLink (a etiketi olarak)</SectionTitle>

      <SubTitle>Cesitli Varyantlar</SubTitle>
      <Row>
        <ButtonLink
          variant="primary"
          size="md"
          href="#"
          iconLeft={<HugeiconsIcon icon={GiftIcon} />}
        >
          Promosyonlar
        </ButtonLink>
        <ButtonLink
          variant="secondary"
          size="md"
          href="#"
          iconLeft={<HugeiconsIcon icon={Award01Icon} />}
        >
          Odullerim
        </ButtonLink>
        <ButtonLink variant="tertiary" size="md" href="#">
          Detaylar
        </ButtonLink>
        <ButtonLink variant="outline" size="md" href="#">
          Iptal
        </ButtonLink>
        <ButtonLink variant="link" href="#">
          Daha Fazla
        </ButtonLink>
      </Row>

      <SubTitle>Disabled Link</SubTitle>
      <Row>
        <ButtonLink variant="primary" size="md" href="#" disabled>
          Promosyonlar
        </ButtonLink>
        <ButtonLink variant="secondary" size="sm" href="#" disabled>
          Odullerim
        </ButtonLink>
        <ButtonLink variant="link" href="#" disabled>
          Daha Fazla
        </ButtonLink>
      </Row>

      {/* ================================================================ */}
      {/* ICON BUTTON LINK VARIANTS */}
      {/* ================================================================ */}
      <SectionTitle>IconButtonLink (a etiketi olarak)</SectionTitle>

      <Row>
        <IconButtonLink
          variant="primary"
          size="md"
          href="#"
          icon={<HugeiconsIcon icon={Search01Icon} />}
        />
        <IconButtonLink
          variant="secondary"
          size="md"
          href="#"
          icon={<HugeiconsIcon icon={Notification02Icon} />}
        />
        <IconButtonLink
          variant="tertiary"
          size="sm"
          href="#"
          icon={<HugeiconsIcon icon={PlusSignCircleIcon} />}
        />
        <IconButtonLink
          variant="outline"
          size="sm"
          href="#"
          icon={<HugeiconsIcon icon={UserCircleIcon} />}
        />
        <IconButtonLink
          variant="primary"
          size="md"
          href="#"
          icon={<HugeiconsIcon icon={GiftIcon} />}
          disabled
        />
      </Row>
    </div>
  )
}
