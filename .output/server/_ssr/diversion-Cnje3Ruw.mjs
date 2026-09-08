import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DlW_Ve0v.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { t as useAuth } from "./use-auth-D4BEwepl.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as Label, t as Input } from "./label-CmIE8x5o.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as CircleQuestionMark, E as Circle, P as Brain, d as Plus, i as Trash2, v as Lightbulb, y as Laugh } from "../_libs/lucide-react.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
import { t as Badge } from "./badge-Cc0IblCb.mjs";
import { t as Skeleton } from "./skeleton-wE5XVTSu.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-DFjnKMNx.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { n as CardContent, r as CardHeader, t as Card } from "./card-CGCM0s9z.mjs";
import { n as RadioGroupIndicator, r as RadioGroupItem$1, t as RadioGroup$1 } from "../_libs/radix-ui__react-radio-group.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diversion-Cnje3Ruw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup$1, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroup$1.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem$1, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
var FUN_CATEGORIES = [
	{
		value: "chiste",
		label: "Chiste",
		icon: Laugh
	},
	{
		value: "adivinanza",
		label: "Adivinanza",
		icon: Lightbulb
	},
	{
		value: "trivia",
		label: "Trivia",
		icon: Brain
	},
	{
		value: "pregunta",
		label: "Pregunta",
		icon: CircleQuestionMark
	}
];
function FunPage() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [category, setCategory] = (0, import_react.useState)("todas");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		category: "chiste",
		content: "",
		answer: "",
		option1: "",
		option2: "",
		option3: "",
		option4: ""
	});
	const { data: items, isLoading } = useQuery({
		queryKey: ["fun-items"],
		queryFn: async () => {
			const { data, error } = await supabase.from("fun_items").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const create = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("Sin sesión");
			if (!form.content.trim()) throw new Error("Escribe algo divertido");
			const options = form.category === "trivia" ? [
				form.option1,
				form.option2,
				form.option3,
				form.option4
			].filter((o) => o.trim()) : null;
			const { error } = await supabase.from("fun_items").insert({
				user_id: user.id,
				category: form.category,
				content: form.content.trim(),
				answer: form.category !== "chiste" ? form.answer.trim() : null,
				options: options?.length ? options : null
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("¡Agregado!");
			setForm({
				category: "chiste",
				content: "",
				answer: "",
				option1: "",
				option2: "",
				option3: "",
				option4: ""
			});
			setOpen(false);
			qc.invalidateQueries({ queryKey: ["fun-items"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const remove = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("fun_items").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Eliminado");
			qc.invalidateQueries({ queryKey: ["fun-items"] });
		}
	});
	const visible = (items ?? []).filter((i) => category === "todas" || i.category === category);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold",
					children: "Diversión"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Ríanse, jueguen y conozcan cosas nuevas del otro."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open,
					onOpenChange: setOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "rounded-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 size-4" }), " Agregar"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						className: "max-h-[90vh] overflow-y-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "font-display",
								children: "Agregar algo divertido"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoría" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: form.category,
											onValueChange: (v) => setForm({
												...form,
												category: v
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: FUN_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: c.value,
												children: c.label
											}, c.value)) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "content",
											children: "Contenido"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "content",
											rows: 4,
											maxLength: 1e3,
											value: form.content,
											onChange: (e) => setForm({
												...form,
												content: e.target.value
											}),
											placeholder: form.category === "chiste" ? "Escribe el chiste..." : form.category === "adivinanza" ? "Escribe la adivinanza..." : form.category === "trivia" ? "Escribe la pregunta..." : "Escribe tu pregunta..."
										})]
									}),
									form.category !== "chiste" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "answer",
											children: "Respuesta correcta"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "answer",
											maxLength: 200,
											value: form.answer,
											onChange: (e) => setForm({
												...form,
												answer: e.target.value
											}),
											placeholder: "La respuesta es..."
										})]
									}),
									form.category === "trivia" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Opciones (mínimo 2)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "Opción A",
													value: form.option1,
													onChange: (e) => setForm({
														...form,
														option1: e.target.value
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "Opción B",
													value: form.option2,
													onChange: (e) => setForm({
														...form,
														option2: e.target.value
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "Opción C (opcional)",
													value: form.option3,
													onChange: (e) => setForm({
														...form,
														option3: e.target.value
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "Opción D (opcional)",
													value: form.option4,
													onChange: (e) => setForm({
														...form,
														option4: e.target.value
													})
												})
											]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "rounded-full",
								onClick: () => create.mutate(),
								disabled: create.isPending,
								children: "Guardar"
							}) })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: category === "todas" ? "default" : "outline",
					className: "rounded-full",
					onClick: () => setCategory("todas"),
					children: "Todos"
				}), FUN_CATEGORIES.map((c) => {
					const Icon = c.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: category === c.value ? "default" : "outline",
						className: "rounded-full",
						onClick: () => setCategory(c.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mr-1 size-4" }),
							" ",
							c.label
						]
					}, c.value);
				})]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [
					0,
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 rounded-2xl" }, i))
			}) : visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface flex flex-col items-center gap-3 p-14 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laugh, { className: "size-8 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl",
						children: "¡Agreguen algo divertido!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Empiecen con un chiste malo 😄"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: visible.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunCard, {
					item,
					canDelete: item.user_id === user?.id,
					onDelete: () => remove.mutate(item.id)
				}, item.id))
			})
		]
	});
}
function FunCard({ item, canDelete, onDelete }) {
	const [showAnswer, setShowAnswer] = (0, import_react.useState)(false);
	const [selectedOption, setSelectedOption] = (0, import_react.useState)(null);
	const CategoryIcon = FUN_CATEGORIES.find((c) => c.value === item.category)?.icon || CircleQuestionMark;
	const handleOptionSelect = (option) => {
		setSelectedOption(option);
		if (item.answer && option === item.answer) toast.success("¡Correcto! 🎉");
		else if (item.answer) toast.error(`Incorrecto. La respuesta era: ${item.answer}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "animate-fade-up",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
			className: "pb-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryIcon, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						children: FUN_CATEGORIES.find((c) => c.value === item.category)?.label
					})]
				}), canDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: onDelete,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4 text-destructive" })
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed",
				children: item.content
			}),
			item.category === "trivia" && item.options && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
					value: selectedOption || void 0,
					children: item.options.map((option, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center space-x-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
							value: option,
							id: `opt-${item.id}-${idx}`,
							onClick: () => handleOptionSelect(option),
							disabled: !!selectedOption
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: `opt-${item.id}-${idx}`,
							className: "text-sm cursor-pointer",
							children: option
						})]
					}, idx))
				}), selectedOption && item.answer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `mt-2 text-sm font-medium ${selectedOption === item.answer ? "text-green-600" : "text-red-600"}`,
					children: selectedOption === item.answer ? "✅ ¡Correcto!" : `❌ La respuesta era: ${item.answer}`
				})]
			}),
			(item.category === "adivinanza" || item.category === "pregunta") && item.answer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					className: "rounded-full",
					onClick: () => setShowAnswer(!showAnswer),
					children: showAnswer ? "Ocultar respuesta" : "Ver respuesta"
				}), showAnswer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm font-medium text-primary",
					children: item.answer
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: ["Agregado ", new Date(item.created_at).toLocaleDateString("es", {
					day: "numeric",
					month: "short"
				})]
			})
		] })]
	});
}
//#endregion
export { FunPage as component };
