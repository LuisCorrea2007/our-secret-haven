import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DlW_Ve0v.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { t as useAuth } from "./use-auth-D4BEwepl.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useMyProfile } from "./use-profiles-BknMowmB.mjs";
import { i as useSignedUrl } from "./media-Bzxwhsl7.mjs";
import { n as AvatarFallback, r as AvatarImage, t as Avatar } from "./avatar-DYLv5Rbv.mjs";
import { E as Circle, F as Bell, M as Check, N as CalendarHeart, b as Images, c as Sparkles, f as NotebookPen, g as LogOut, k as ChevronRight, l as Settings, n as Video, x as Heart, y as Laugh } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { t as ThemeToggle } from "./theme-toggle-BYI-7IWi.mjs";
import { i as Trigger$1, n as Portal, r as Root2$1, t as Content2$1 } from "../_libs/radix-ui__react-popover.mjs";
import { a as Viewport, i as ScrollAreaThumb, n as Root, r as ScrollAreaScrollbar, t as Corner } from "../_libs/radix-ui__react-scroll-area.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-CMfEm8GP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var Popover = Root2$1;
var PopoverTrigger = Trigger$1;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2$1.displayName;
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {})
	]
}));
ScrollArea.displayName = Root.displayName;
var ScrollBar = import_react.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
	ref,
	orientation,
	className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
}));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
var NAV = [
	{
		to: "/panel",
		label: "Panel",
		icon: Sparkles
	},
	{
		to: "/notas",
		label: "Notas",
		icon: NotebookPen
	},
	{
		to: "/galeria",
		label: "Galería",
		icon: Images
	},
	{
		to: "/videos",
		label: "Videos",
		icon: Video
	},
	{
		to: "/calendario",
		label: "Citas",
		icon: CalendarHeart
	},
	{
		to: "/deseos",
		label: "Deseos",
		icon: Sparkles
	},
	{
		to: "/diario",
		label: "Diario",
		icon: Heart
	},
	{
		to: "/diversion",
		label: "Diversión",
		icon: Laugh
	}
];
function NotificationBell({ userId }) {
	const qc = useQueryClient();
	const { data = [] } = useQuery({
		queryKey: ["notifications", userId],
		queryFn: async () => {
			const { data, error } = await supabase.from("notifications").select("id, title, message, is_read, created_at").order("created_at", { ascending: false }).limit(30);
			if (error) throw error;
			return data ?? [];
		}
	});
	(0, import_react.useEffect)(() => {
		const channel = supabase.channel("notifications-feed").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "notifications"
		}, () => qc.invalidateQueries({ queryKey: ["notifications", userId] })).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [qc, userId]);
	const unread = data.filter((n) => !n.is_read).length;
	async function markAll() {
		await supabase.from("notifications").update({ is_read: true }).eq("user_id", userId);
		qc.invalidateQueries({ queryKey: ["notifications", userId] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon",
			className: "relative rounded-full transition-transform hover:scale-110",
			"aria-label": "Notificaciones",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				className: "absolute -right-0.5 -top-0.5 size-4 justify-center rounded-full p-0 text-[10px]",
				children: unread
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
		align: "end",
		className: "w-80 p-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-sm font-semibold",
				children: "Notificaciones"
			}), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: markAll,
				className: "text-xs text-primary underline-offset-2 hover:underline",
				children: "Marcar todas"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "max-h-80",
			children: data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 py-8 text-center text-sm text-muted-foreground",
				children: "Todo tranquilo por aquí."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y",
				children: data.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("px-4 py-3", !n.is_read && "bg-accent/40"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: n.title
						}),
						n.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: n.message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: new Date(n.created_at).toLocaleString("es", {
								day: "numeric",
								month: "short",
								hour: "2-digit",
								minute: "2-digit"
							})
						})
					]
				}, n.id))
			})
		})]
	})] });
}
function AppShell({ children }) {
	const { user } = useAuth();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { data: profile } = useMyProfile(user?.id);
	const { data: avatar } = useSignedUrl(profile?.avatar_url);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	async function signOut() {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center gap-3 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/panel",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-5 fill-primary text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg font-semibold tracking-tight",
								children: "Nuestro Espacio"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "ml-6 hidden items-center gap-1 md:flex",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground", pathname === item.to && "bg-accent text-accent-foreground"),
								children: item.label
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
								mounted && user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationBell, { userId: user.id }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "ml-1 rounded-full ring-offset-background transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
											className: "size-9 border border-border",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
												src: avatar ?? void 0,
												alt: profile?.name ?? "Perfil"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
												className: "bg-secondary text-xs",
												children: (profile?.name ?? "?").slice(0, 2).toUpperCase()
											})]
										})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
									align: "end",
									className: "w-56",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, {
											className: "font-normal",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium",
												children: profile?.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: profile?.email
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/ajustes",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "mr-2 size-4" }), " Ajustes"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onClick: signOut,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-2 size-4" }), " Cerrar sesión"]
										})
									]
								})] })
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-6xl px-4 pb-28 pt-8 md:pb-16",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 backdrop-blur-xl md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mx-auto flex max-w-md items-center justify-between px-2 py-1.5",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex w-14 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium text-muted-foreground transition-colors", pathname === item.to && "text-primary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }), item.label]
					}) }, item.to))
				})
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
//#endregion
export { SplitComponent as component };
