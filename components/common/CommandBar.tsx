import classNames from "classnames";
import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  ActionId,
  ActionImpl,
  KBarResults,
  useMatches,
  createAction,
} from "kbar";
import { useRouter } from "next/router";
import React, { forwardRef } from "react";
import { HiOutlineHome } from "react-icons/hi";

const CommandBar = () => {
  return (
    <KBarPortal>
      <KBarPositioner className="bg-dark102 bg-opacity-20 backdrop-blur-sm">
        <KBarAnimator className="max-w-xl w-full bg-white dark:bg-dark101 dark:text-white rounded-lg shadow-lg">
          <KBarSearch className="py-3 px-4 text-base w-full box-border outline-none border-none rounded-t-lg bg-gray-50 dark:bg-gray-700 text-dark102 dark:text-white" />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};

function RenderResults() {
  const { results, rootActionId } = useMatches();
  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="pt-2 px-4 text-xs dark:text-white uppercase opacity-70 dark:opacity-90">
            {item}
          </div>
        ) : (
          <ResultItem
            action={item}
            active={active}
            currentRootActionId={rootActionId as string}
          />
        )
      }
    />
  );
}

// eslint-disable-next-line react/display-name
const ResultItem = forwardRef(
  (
    {
      action,
      active,
      currentRootActionId,
    }: {
      action: ActionImpl;
      active: boolean;
      currentRootActionId: ActionId;
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const ancestors = React.useMemo(() => {
      if (!currentRootActionId) return action.ancestors;
      const index = action.ancestors.findIndex(
        (ancestor) => ancestor.id === currentRootActionId
      );
      return action.ancestors.slice(index + 1);
    }, [action.ancestors, currentRootActionId]);

    return (
      <div
        ref={ref}
        className={classNames(
          "px-4 py-3 border-l-2 flex items-center justify-between cursor-pointer",
          active
            ? "bg-gray-100 dark:bg-dark102 border-dark101"
            : "transparent border-transparent text-black dark:text-white"
        )}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            fontSize: 14,
          }}
        >
          <span className="text-xl dark:text-white">
            {action.icon && action.icon}
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              {ancestors.length > 0 &&
                ancestors.map((ancestor) => (
                  <React.Fragment key={ancestor.id}>
                    <span
                      style={{
                        opacity: 0.5,
                        marginRight: 8,
                      }}
                    >
                      {ancestor.name}
                    </span>
                    <span
                      style={{
                        marginRight: 8,
                      }}
                    >
                      &rsaquo;
                    </span>
                  </React.Fragment>
                ))}
              <span>{action.name}</span>
            </div>
            {action.subtitle && (
              <span style={{ fontSize: 12 }}>{action.subtitle}</span>
            )}
          </div>
        </div>
        {action.shortcut?.length ? (
          <div
            aria-hidden
            style={{ display: "grid", gridAutoFlow: "column", gap: "4px" }}
          >
            {action.shortcut.map((sc: any) => (
              <kbd
                key={sc}
                style={{
                  padding: "4px 6px",
                  background: "rgba(0 0 0 / .1)",
                  borderRadius: "4px",
                  fontSize: 14,
                }}
              >
                {sc}
              </kbd>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);

export default CommandBar;
